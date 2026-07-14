const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

/**
 * Stream a multer memory-buffer to Cloudinary and return a Promise
 * that resolves with the Cloudinary upload result.
 */
const streamUpload = (buffer, options) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (result) resolve(result);
      else reject(error);
    });
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

// @desc    Upload a file to Cloudinary
// @route   POST /api/upload
// @access  Private
exports.uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const result = await streamUpload(req.file.buffer, {
      folder: 'final-destination',
      resource_type: 'auto',
      transformation: [{ width: 1200, crop: 'limit', quality: 'auto' }],
    });

    res.json({
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a file from Cloudinary
// @route   DELETE /api/upload/:publicId
// @access  Private
exports.deleteFile = async (req, res, next) => {
  try {
    const result = await cloudinary.uploader.destroy(req.params.publicId);

    if (result.result !== 'ok') {
      return res.status(400).json({ message: 'Failed to delete file' });
    }

    res.json({ message: 'File deleted' });
  } catch (error) {
    next(error);
  }
};
