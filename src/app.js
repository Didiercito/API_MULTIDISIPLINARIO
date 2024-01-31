const express = require('express');
const connectDB = require('./configs/db/db.configs.js');
const usuarioRoutes = require('./routes/usuarios.routes.js');
const categoriaRoutes = require('./routes/categoria.routes.js');
const productoRoutes = require('./routes/productos.routes.js');
const carritoRoutes = require('./routes/carrito.routes.js');

connectDB();

const app = express();
app.use(express.json());

app.use('/usuario', usuarioRoutes);
app.use('/categoria',categoriaRoutes);
app.use('/producto', productoRoutes);
app.use('/carrito', carritoRoutes); 


module.exports = app;
