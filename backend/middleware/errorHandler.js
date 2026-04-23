const errorHandler = (err, req, res, next) => {
  console.error('❌ Error stack:', err.stack);

  if (res.headersSent) {
    return next(err);
  }

  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong!';

  // 🔹 Handle body size error (VERY IMPORTANT for your case)
  if (err.type === 'entity.too.large') {
    statusCode = 413;
    message = 'Image too large. Please upload smaller file (max ~1MB)';
  }

  // 🔹 Handle invalid JSON
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    statusCode = 400;
    message = 'Invalid JSON format';
  }

  // 🔹 Handle mongoose validation
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors)
      .map(e => e.message)
      .join(', ');
  }

  // 🔹 Handle mongoose cast error (invalid ID)
  if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid ID format';
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};



module.exports = errorHandler;