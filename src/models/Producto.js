const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre del producto es obligatorio'],
      trim: true,
      maxlength: [150, 'El nombre no debe superar los 150 caracteres'],
    },
    precio: {
      type: Number,
      required: [true, 'El precio del producto es obligatorio'],
      min: [0, 'El precio no puede ser negativo'],
    },
    marca: {
      type: String,
      required: [true, 'La marca del producto es obligatoria'],
      trim: true,
      maxlength: [100, 'La marca no debe superar los 100 caracteres'],
    },
    categoria: {
      type: String,
      required: [true, 'La categoría del producto es obligatoria'],
      trim: true,
      maxlength: [100, 'La categoría no debe superar los 100 caracteres'],
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('Producto', ProductoSchema, 'productos');
