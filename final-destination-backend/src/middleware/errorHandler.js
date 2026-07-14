/**
 * Central error-handling middleware.
 * Must be registered AFTER all routes in app.js.
 */
const errorHandler = (err, req, res, _next) => {
  console.error(err.stack);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Resource not found (invalid ID)' });
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue).join(', ');
    return res
      .status(400)
      .json({ message: `Duplicate value for field: ${field}` });
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ message: messages.join(', ') });
  }

  // Multer file-size limit
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res
      .status(400)
      .json({ message: 'File too large. Maximum size is 5 MB.' });
  }

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = errorHandler;
