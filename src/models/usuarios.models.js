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
    unique: true,
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
  }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
