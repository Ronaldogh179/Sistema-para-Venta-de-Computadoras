const Cliente = require('../models/Cliente');
const Venta = require('../models/Venta');
const asyncHandler = require('../middleware/asyncHandler');
const AppError = require('../utils/AppError');
const HTTP_STATUS = require('../constants/httpStatus');
const MESSAGES = require('../constants/messages');
const { ensureValidObjectId } = require('../utils/validators');
const createCrudController = require('./crudControllerFactory');

const CLIENTE_FIELDS = ['nombre', 'direccion', 'telefono'];

const crud = createCrudController({
  Model: Cliente,
  allowedFields: CLIENTE_FIELDS,
  notFoundMessage: MESSAGES.CLIENTE_NOT_FOUND,
  deletedMessage: MESSAGES.CLIENTE_DELETED,
});

const getVentasByCliente = asyncHandler(async (req, res) => {
  ensureValidObjectId(req.params.id);

  const clienteExiste = await Cliente.exists({ _id: req.params.id });
  if (!clienteExiste) {
    throw new AppError(MESSAGES.CLIENTE_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
  }

  const ventas = await Venta.find({ cliente: req.params.id })
    .populate('cliente')
    .populate('items.producto')
    .sort({ fecha: -1 });

  res.status(HTTP_STATUS.OK).json(ventas);
});

module.exports = { ...crud, getVentasByCliente };
