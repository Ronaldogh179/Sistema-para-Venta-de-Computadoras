const AppError = require('./AppError');
const HTTP_STATUS = require('../constants/httpStatus');
const MESSAGES = require('../constants/messages');

const OBJECT_ID_PATTERN = /^[a-f\d]{24}$/i;

const isValidObjectId = (value) =>
  typeof value === 'string' && OBJECT_ID_PATTERN.test(value);

const ensureValidObjectId = (value) => {
  if (!isValidObjectId(value)) {
    throw new AppError(MESSAGES.INVALID_ID, HTTP_STATUS.BAD_REQUEST);
  }
  return value;
};

const ensureNonEmptyArray = (value, fieldName) => {
  if (!Array.isArray(value) || value.length === 0) {
    throw new AppError(`El campo ${fieldName} debe contener al menos un elemento`, HTTP_STATUS.BAD_REQUEST);
  }
  return value;
};

const pickFields = (source, allowedFields) =>
  allowedFields.reduce((result, field) => {
    if (source?.[field] !== undefined) {
      result[field] = source[field];
    }
    return result;
  }, {});

module.exports = {
  ensureValidObjectId,
  ensureNonEmptyArray,
  pickFields,
};
