    const Producto = require('../models/productos.models');
    const Carrito = require('../models/carrito.models');

    const addToCart = async (req, res) => {
    const { id_usuario, id_producto, cantidad } = req.body;

    try {
        const usuarioExistente = await Usuario.findById(id_usuario);
        const productoExistente = await Producto.findById(id_producto);

        if (!usuarioExistente || !productoExistente) {
        return res.status(404).json({ error: 'Usuario o producto no encontrado' });
        }

        const carrito = await Carrito.findOne({ usuario: id_usuario });

        if (!carrito) {
        const nuevoCarrito = new Carrito({
            usuario: usuarioExistente._id,
            productos: [{ producto: productoExistente._id, cantidad }]
        });

        await nuevoCarrito.save();
        return res.json(nuevoCarrito);
        }

        const productoEnCarrito = carrito.productos.find(
        (item) => item.producto.toString() === id_producto
        );

        if (productoEnCarrito) {
        productoEnCarrito.cantidad += cantidad;
        } else {
        carrito.productos.push({ producto: productoExistente._id, cantidad });
        }

        await carrito.save();
        res.json(carrito);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al agregar producto al carrito' });
    }
    };


    const removeFromCart = async (req, res) => {
        const { id_usuario, id_producto } = req.body;
    
        try {
        const carrito = await Carrito.findOne({ usuario: id_usuario });
    
        if (!carrito) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }
    
        carrito.productos = carrito.productos.filter(
            (item) => item.producto.toString() !== id_producto
        );
    
        await carrito.save();
        res.json(carrito);
        } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar producto del carrito' });
        }
    };


    const searchProductInCartByName = async (req, res) => {
        const { id_usuario, nombre_producto } = req.params;
      
        try {
          const carrito = await Carrito.findOne({ usuario: id_usuario });
      
          if (!carrito) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
          }
      
          const productosEnCarrito = await Promise.all(
            carrito.productos.map(async (item) => {
              const producto = await Producto.findById(item.producto);
              return { ...item.toObject(), producto };
            })
          );
      
          const productosPorNombre = productosEnCarrito.filter((item) =>
            item.producto.nombre_producto.toLowerCase().includes(nombre_producto.toLowerCase())
          );
      
          res.json(productosPorNombre);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Error al buscar productos por nombre en el carrito' });
        }
      };
    
    module.exports = {
        addToCart,
        removeFromCart,
        searchProductInCartByName
    };


