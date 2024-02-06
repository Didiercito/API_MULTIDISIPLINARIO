const Producto = require('../models/productos.models');
const Categoria = require('../models/categoria.models');

const getProducto = async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
};

const createProducto = async (req, res) => {
    const { imagen, precio, descripcion, caracteristicas, id_categoria, nombre_producto, id_producto, cantidad } = req.body;

    try {
        const categoriaExistente = await Categoria.findOne({ id_categoria });

        if (!categoriaExistente) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }

        const nuevoProducto = new Producto({
            imagen,
            precio,
            descripcion,
            caracteristicas,
            id_categoria: categoriaExistente.id_categoria,
            nombre_producto,
            id_producto,
            cantidad
        });

        await nuevoProducto.save();
        res.json(nuevoProducto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el producto' });
    }
};

const updateProducto = async (req, res) => {
    const idProducto = req.params.id_producto;
    const { imagen, precio, descripcion, caracteristicas, id_categoria } = req.body;

    try {
        const categoriaExistente = await Categoria.findOne({ id_categoria });

        if (!categoriaExistente) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }

        const productoActualizado = await Producto.findOneAndUpdate(
            { id_producto: idProducto },
            {
                $set: {
                    imagen,
                    precio,
                    descripcion,
                    caracteristicas,
                    id_categoria: categoriaExistente.id_categoria
                }
            },
            { new: true }
        );

        if (!productoActualizado) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.json(productoActualizado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
};  

    

const deleteProducto = async (req, res) => {
    const idProducto = req.params.id_producto;

    try {
        const productoEliminado = await Producto.findOneAndDelete({ _id: idProducto });

        if (!productoEliminado) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        else{
            res.json({message: 'Producto eliminado correctamente', productoEliminado});
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
};


const getProductsByCategory = async (req, res) => {
    const idCategoria = req.params.id_categoria;

    try {
        const productosPorCategoria = await Producto.find({ id_categoria: idCategoria });

        res.json(productosPorCategoria);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos por categoría' });
    }
};

const searchProductoByName = async (req, res) => {
    const nombreProducto = req.params.nombre_producto;

    try {
        const productosPorNombre = await Producto.find({ nombre_producto: new RegExp(nombreProducto, 'i') });

        res.json(productosPorNombre);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al buscar productos por nombre' });
    }
};

module.exports = {
    getProducto,
    createProducto,
    updateProducto,
    deleteProducto,
    getProductsByCategory,
    searchProductoByName
};
    