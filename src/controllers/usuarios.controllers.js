const Usuario = require('../models/usuarios.models');
const carritoControllers = require('../controllers/carrito.contollers');
const Producto = require('../models/productos.models');
const {ObjetId} = require('mongoose').Types

const getUsuario = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error');
    }
};

const createUsuario = async (req, res) => {
    const { id_usuario, nombre, apellido, contrasena, telefono, direccion, correo } = req.body;

    const usuario = new Usuario({
        id_usuario,
        nombre,
        apellido,
        contrasena,
        telefono,
        direccion,
        correo
    });

    await usuario.save();
    res.json(usuario);
};

const updateUsuario = async (req, res) => {
    const idUsuario = req.params.id_usuario;
    const { nombre, apellido, contrasena, telefono, direccion, correo } = req.body;

    try {
        const usuario = await Usuario.findOneAndUpdate(
            { id_usuario: idUsuario },
            {
                $set: {
                    nombre,
                    apellido,
                    contrasena,
                    telefono,
                    direccion,
                    correo
                }
            },
            { new: true }
        );

        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.json({ message: "Usuario actualizado con éxito", usuario });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
};

const deleteUsuario = async (req, res) => {
    const idUsuario = req.params.id_usuario;

    try {
        const usuario = await Usuario.findOneAndDelete({ id_usuario: idUsuario });

        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.json({ message: "Usuario eliminado con éxito", usuario });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
};

const searchUserByName = async (req, res) => {
    try {
        const { letra } = req.params;

        const usuarios = await Usuario.find({ nombre: new RegExp(letra, 'i') });

        res.json(usuarios);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al buscar usuarios por nombre o letra');
    }
};

const addToCart = async (req, res) => {
  const { id_usuario, id_producto, cantidad } = req.body;

  try {
      const usuarioExistente = await Usuario.findById(id_usuario);
      const productoExistente = await Producto.findById(ObjectId(id_producto)); 

      if (!usuarioExistente || !productoExistente) {
          return res.status(404).json({ error: 'Usuario o producto no encontrado' });
      }

      const carritoResponse = await carritoControllers.addToCart({
          id_usuario,
          id_producto: ObjectId(id_producto), 
          cantidad
      });

      res.json(carritoResponse);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al agregar producto al carrito' });
  }
};

module.exports = {
    getUsuario,
    createUsuario,
    updateUsuario,
    deleteUsuario,
    searchUserByName,
    addToCart
};
