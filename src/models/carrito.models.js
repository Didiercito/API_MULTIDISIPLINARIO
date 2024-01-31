// carrito.models.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carritoSchema = new Schema({
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  productos: [
    {
      producto: {
        type: Schema.Types.ObjectId,
        ref: 'Producto',
        required: true
      },
      cantidad: {
        type: Number,
        required: true
      }
    }
  ]
});

const Carrito = mongoose.model('Carrito', carritoSchema);

module.exports = Carrito;