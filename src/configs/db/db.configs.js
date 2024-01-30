const mongoose = require('mongoose');
require('dotenv').config();

const URI = process.env.MONGO_URI;

async function connectDB() {
  try {
    await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error de conexión a MongoDB:', error);
  }
}

module.exports = connectDB;
