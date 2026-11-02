const Producto = require('../models/Producto');
const MESSAGES = require('../constants/messages');
const createCrudController = require('./crudControllerFactory');

const PRODUCTO_FIELDS = ['nombre', 'precio', 'marca', 'categoria'];

module.exports = createCrudController({
  Model: Producto,
  allowedFields: PRODUCTO_FIELDS,
  notFoundMessage: MESSAGES.PRODUCTO_NOT_FOUND,
  deletedMessage: MESSAGES.PRODUCTO_DELETED,
});
