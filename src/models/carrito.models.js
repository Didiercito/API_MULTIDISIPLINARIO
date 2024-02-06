const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carritoSchema = new Schema({
  id_usuario: {
    type: String,
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
