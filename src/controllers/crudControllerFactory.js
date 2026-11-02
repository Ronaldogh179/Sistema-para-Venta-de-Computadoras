const asyncHandler = require('../middleware/asyncHandler');
const AppError = require('../utils/AppError');
const HTTP_STATUS = require('../constants/httpStatus');
const { ensureValidObjectId, pickFields } = require('../utils/validators');

const createCrudController = ({ Model, allowedFields, notFoundMessage, deletedMessage }) => {
  const create = asyncHandler(async (req, res) => {
    const data = pickFields(req.body, allowedFields);
    const document = await Model.create(data);
    res.status(HTTP_STATUS.CREATED).json(document);
  });

  const findAll = asyncHandler(async (_req, res) => {
    const documents = await Model.find();
    res.status(HTTP_STATUS.OK).json(documents);
  });

  const findById = asyncHandler(async (req, res) => {
    ensureValidObjectId(req.params.id);
    const document = await Model.findById(req.params.id);
    if (!document) {
      throw new AppError(notFoundMessage, HTTP_STATUS.NOT_FOUND);
    }
    res.status(HTTP_STATUS.OK).json(document);
  });

  const replace = asyncHandler(async (req, res) => {
    ensureValidObjectId(req.params.id);
    const data = pickFields(req.body, allowedFields);
    const document = await Model.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
      overwrite: true,
    });
    if (!document) {
      throw new AppError(notFoundMessage, HTTP_STATUS.NOT_FOUND);
    }
    res.status(HTTP_STATUS.OK).json(document);
  });

  const update = asyncHandler(async (req, res) => {
    ensureValidObjectId(req.params.id);
    const data = pickFields(req.body, allowedFields);
    const document = await Model.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });
    if (!document) {
      throw new AppError(notFoundMessage, HTTP_STATUS.NOT_FOUND);
    }
    res.status(HTTP_STATUS.OK).json(document);
  });

  const remove = asyncHandler(async (req, res) => {
    ensureValidObjectId(req.params.id);
    const document = await Model.findByIdAndDelete(req.params.id);
    if (!document) {
      throw new AppError(notFoundMessage, HTTP_STATUS.NOT_FOUND);
    }
    res.status(HTTP_STATUS.OK).json({ mensaje: deletedMessage });
  });

  return { create, findAll, findById, replace, update, remove };
};

module.exports = createCrudController;
