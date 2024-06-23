// src/middlewares/errorHandler.js

const { winstonLogger } = require("../utils/winstonLogger.util");

const errorHandler = (err, req, res, next) => {
  winstonLogger.error(err.message, err);
  res.status(500).json({
    success: false,
    message: 'Something went wrong. Please try again later.',
    error: err.message,
  });
};

module.exports = errorHandler;
