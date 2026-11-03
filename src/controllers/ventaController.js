const Venta = require('../models/Venta');
const Producto = require('../models/Producto');
const Cliente = require('../models/Cliente');
const asyncHandler = require('../middleware/asyncHandler');
const AppError = require('../utils/AppError');
const HTTP_STATUS = require('../constants/httpStatus');
const MESSAGES = require('../constants/messages');
const { ensureValidObjectId, ensureNonEmptyArray } = require('../utils/validators');

const validateItem = (item) => {
  if (typeof item !== 'object' || item === null) {
    throw new AppError(MESSAGES.INVALID_ITEM, HTTP_STATUS.BAD_REQUEST);
  }

  ensureValidObjectId(item.producto);

  const cantidad = Number(item.cantidad);
  if (!Number.isInteger(cantidad) || cantidad < 1) {
    throw new AppError(MESSAGES.INVALID_QUANTITY, HTTP_STATUS.BAD_REQUEST);
  }

  return { producto: item.producto, cantidad };
};

const buildSaleItems = (items, productosById) =>
  items.map((item) => {
    const producto = productosById.get(item.producto.toLowerCase());
    if (!producto) {
      throw new AppError(`${MESSAGES.PRODUCTO_NOT_FOUND}: ${item.producto}`, HTTP_STATUS.NOT_FOUND);
    }

    return {
      producto: producto._id,
      cantidad: item.cantidad,
      precioUnitario: producto.precio,
    };
  });

const calculateTotal = (items) =>
  items.reduce((total, item) => total + item.precioUnitario * item.cantidad, 0);

const createVenta = asyncHandler(async (req, res) => {
  const { cliente, items } = req.body;

  ensureValidObjectId(cliente);
  ensureNonEmptyArray(items, 'items');

  const itemsValidados = items.map(validateItem);

  const clienteExiste = await Cliente.exists({ _id: cliente });
  if (!clienteExiste) {
    throw new AppError(MESSAGES.CLIENTE_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
  }

  const productoIds = [...new Set(itemsValidados.map((item) => item.producto))];
  const productos = await Producto.find({ _id: { $in: productoIds } });
  const productosById = new Map(productos.map((producto) => [String(producto._id), producto]));

  const itemsConPrecio = buildSaleItems(itemsValidados, productosById);
  const total = calculateTotal(itemsConPrecio);

  const venta = await Venta.create({ cliente, items: itemsConPrecio, total });
  const ventaPopulada = await Venta.findById(venta._id)
    .populate('cliente')
    .populate('items.producto');

  res.status(HTTP_STATUS.CREATED).json(ventaPopulada);
});

const getResumenVentasPorCliente = asyncHandler(async (_req, res) => {
  const resumen = await Venta.aggregate([
    {
      $group: {
        _id: '$cliente',
        cantidadVentas: { $sum: 1 },
        totalFacturado: { $sum: '$total' },
        productosVendidos: { $sum: { $sum: '$items.cantidad' } },
      },
    },
    {
      $lookup: {
        from: 'clientes',
        localField: '_id',
        foreignField: '_id',
        as: 'cliente',
      },
    },
    { $unwind: '$cliente' },
    {
      $project: {
        _id: 0,
        clienteId: '$_id',
        nombre: '$cliente.nombre',
        telefono: '$cliente.telefono',
        cantidadVentas: 1,
        totalFacturado: 1,
        productosVendidos: 1,
      },
    },
    { $sort: { totalFacturado: -1 } },
  ]);

  res.status(HTTP_STATUS.OK).json(resumen);
});

const getVentas = asyncHandler(async (_req, res) => {
  const ventas = await Venta.find()
    .populate('cliente')
    .populate('items.producto')
    .sort({ fecha: -1 });

  res.status(HTTP_STATUS.OK).json(ventas);
});

const getVentaById = asyncHandler(async (req, res) => {
  ensureValidObjectId(req.params.id);

  const venta = await Venta.findById(req.params.id)
    .populate('cliente')
    .populate('items.producto');

  if (!venta) {
    throw new AppError(MESSAGES.VENTA_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
  }

  res.status(HTTP_STATUS.OK).json(venta);
});

module.exports = {
  createVenta,
  getVentas,
  getVentaById,
  getResumenVentasPorCliente,
};
