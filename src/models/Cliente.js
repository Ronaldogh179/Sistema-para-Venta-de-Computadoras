const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre del cliente es obligatorio'],
      trim: true,
      maxlength: [100, 'El nombre no debe superar los 100 caracteres'],
    },
    direccion: {
      type: String,
      required: [true, 'La dirección del cliente es obligatoria'],
      trim: true,
      maxlength: [200, 'La dirección no debe superar los 200 caracteres'],
    },
    telefono: {
      type: String,
      required: [true, 'El teléfono del cliente es obligatorio'],
      trim: true,
      match: [/^[0-9+\-\s]{7,20}$/, 'El teléfono no tiene un formato válido'],
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('Cliente', ClienteSchema, 'clientes');
