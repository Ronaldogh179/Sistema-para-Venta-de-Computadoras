const mongoose = require('mongoose');

const VentaItemSchema = new mongoose.Schema({
  producto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Producto',
    required: [true, 'El producto es obligatorio en cada item'],
  },
  cantidad: {
    type: Number,
    required: [true, 'La cantidad es obligatoria en cada item'],
    min: [1, 'La cantidad debe ser al menos 1'],
  },
  precioUnitario: {
    type: Number,
    required: [true, 'El precio unitario es obligatorio en cada item'],
    min: [0, 'El precio unitario no puede ser negativo'],
  },
});

const VentaSchema = new mongoose.Schema(
  {
    cliente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cliente',
      required: [true, 'El cliente es obligatorio'],
    },
    items: {
      type: [VentaItemSchema],
      validate: {
        validator: (items) => Array.isArray(items) && items.length > 0,
        message: 'La venta debe contener al menos un producto',
      },
    },
    fecha: { type: Date, default: Date.now },
    total: {
      type: Number,
      required: [true, 'El total de la venta es obligatorio'],
      min: [0, 'El total no puede ser negativo'],
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('Venta', VentaSchema, 'ventas');
