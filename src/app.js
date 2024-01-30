const express = require('express');
const connectDB = require('./configs/db/db.configs.js');
const usuarioRoutes = require('./routes/usuarios.routes.js');

connectDB();

const app = express();
app.use(express.json());

app.use('/usuario', usuarioRoutes);

module.exports = app;
