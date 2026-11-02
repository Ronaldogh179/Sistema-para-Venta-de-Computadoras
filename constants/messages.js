const MESSAGES = Object.freeze({
  CLIENTE_NOT_FOUND: 'Cliente no encontrado',
  PRODUCTO_NOT_FOUND: 'Producto no encontrado',
  VENTA_NOT_FOUND: 'Venta no encontrada',
  CLIENTE_DELETED: 'Cliente eliminado correctamente',
  PRODUCTO_DELETED: 'Producto eliminado correctamente',
  INVALID_ID: 'El identificador proporcionado no es válido',
  INVALID_ITEM: 'El formato de los items de la venta no es válido',
  INVALID_QUANTITY: 'La cantidad de cada producto debe ser un entero mayor o igual a 1',
  EMPTY_ITEMS: 'La venta debe contener al menos un producto',
  VALIDATION_ERROR: 'Los datos proporcionados no son válidos',
  INVALID_JSON: 'El cuerpo de la solicitud no es un JSON válido',
  INTERNAL_ERROR: 'Error interno del servidor',
  ROUTE_NOT_FOUND: 'Ruta no encontrada',
});

module.exports = MESSAGES;
