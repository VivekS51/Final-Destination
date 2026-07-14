const multer = require('multer');

// Use memory storage — files are buffered in RAM, then streamed to Cloudinary
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (_req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp|pdf/;
    const extOk = allowedTypes.test(file.originalname.toLowerCase().split('.').pop());
    const mimeOk = allowedTypes.test(file.mimetype.split('/').pop());

    if (extOk || mimeOk) {
      cb(null, true);
    } else {
      cb(new Error('Only images (jpg, png, gif, webp) and PDFs are allowed'), false);
    }
  },
});

module.exports = upload;
