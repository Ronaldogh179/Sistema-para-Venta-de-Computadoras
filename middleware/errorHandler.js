const mongoose = require('mongoose');
const config = require('../config/env');
const HTTP_STATUS = require('../constants/httpStatus');
const MESSAGES = require('../constants/messages');
const AppError = require('../utils/AppError');
const logger = require('../utils/logger');

const isInvalidJsonError = (error) =>
  error instanceof SyntaxError &&
  error.status === HTTP_STATUS.BAD_REQUEST &&
  Object.prototype.hasOwnProperty.call(error, 'body');

const normalizeError = (error) => {
  if (isInvalidJsonError(error)) {
    return new AppError(MESSAGES.INVALID_JSON, HTTP_STATUS.BAD_REQUEST);
  }

  if (error instanceof mongoose.Error.CastError) {
    return new AppError(MESSAGES.INVALID_ID, HTTP_STATUS.BAD_REQUEST);
  }

  if (error instanceof mongoose.Error.ValidationError) {
    const details = Object.values(error.errors).map((item) => item.message);
    return new AppError(`${MESSAGES.VALIDATION_ERROR}: ${details.join('. ')}`, HTTP_STATUS.BAD_REQUEST);
  }

  return error;
};

const errorHandler = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  const normalizedError = normalizeError(error);
  const statusCode = normalizedError.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const isOperational = normalizedError.isOperational === true;
  const message = isOperational ? normalizedError.message : MESSAGES.INTERNAL_ERROR;

  if (statusCode >= HTTP_STATUS.INTERNAL_SERVER_ERROR) {
    logger.error(`${req.method} ${req.originalUrl} -> ${error.message}`);
  }

  const response = { mensaje: message };
  if (config.nodeEnv === 'development' && statusCode >= HTTP_STATUS.INTERNAL_SERVER_ERROR) {
    response.detalle = error.message;
  }

  return res.status(statusCode).json(response);
};

module.exports = errorHandler;
