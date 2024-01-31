const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Categoria = require('./categoria.models'); 
const productoSchema = new Schema({
    imagen: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    caracteristicas: {
        type: String
    }, 
    id_categoria: {
        type: String,
        ref: 'Categoria' 
    },

    nombre_producto: {
        type: String,
        required: true 
    }
});

const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;