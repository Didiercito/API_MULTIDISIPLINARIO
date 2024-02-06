const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
  id_usuario: {
    type: String,
    unique: true,
    required: true,
  },
  nombre: {
    type: String,
    required: true
  },
  apellido: {
    type: String,
    required: true
  },
  contrasena: {
    type: String,
    required: true
  },
  telefono: {
    type: String,
    unique: true,
  },
  direccion: {
    type: String
  },
  correo: {
    type: String,
    unique: true,
    required: true
  },
  carrito: {
    type: Schema.Types.ObjectId,
    ref: 'Carrito'
  }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
