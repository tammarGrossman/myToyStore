const AppError =  require("../errors/AppError");
const sendError = (res, error) => {
  let statusCode = 500; // Default to Internal Server Error

  if (error instanceof AppError) {
      statusCode = error.statusCode || 500; // Use the provided status code or default to 500
  }

  // Ensure that the status code is a valid HTTP status code
  if (statusCode < 100 || statusCode >= 600 || !Number.isInteger(statusCode)) {
      statusCode = 500; // Default to Internal Server Error
  }

  res.status(statusCode).json({
      error: {
          message: error.message || 'Internal Server Error',
      },
  });
};

const sendSuccess = (res, data) => {
  res.status(200).json({
      data,
  });
};

module.exports = { sendError, sendSuccess };
