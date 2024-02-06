const Categoria = require('../models/categoria.models');

const getCategoria = async (req,res) => {
    try {
        const categorias = await Categoria.find();
        res.json(categorias);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las categorías' });
      }
};


const createCategoria = async (req, res) => {
    const { id_categoria, nombre_categoria, descripcion } = req.body;
  
    const nuevaCategoria = new Categoria({
      id_categoria,
      nombre_categoria,
      descripcion
    });
  
    try {
      await nuevaCategoria.save();
      res.json(nuevaCategoria);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear la categoría' });
    }
  };



  const updateCategoria = async (req, res) => {
    const idCategoria = req.params.id_categoria;
    const { nombre, descripcion } = req.body;
  
    try {
      const categoriaActualizada = await Categoria.findOneAndUpdate(
        { id_categoria: idCategoria },
        { $set: { nombre, descripcion } },
        { new: true }
      );
  
      if (!categoriaActualizada) {
        return res.status(404).json({ error: 'Categoría no encontrada' });
      }
  
      res.json(categoriaActualizada);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar la categoría' });
    }
  };
  

  const deleteCategoria = async (req, res) => {
    const idCategoria = req.params.id_categoria;
  
    try {
      const categoriaEliminada = await Categoria.findOneAndDelete({ id_categoria: idCategoria });
  
      if (!categoriaEliminada) {
        return res.status(404).json({ error: 'Categoría no encontrada' });
      }
  
      res.json(categoriaEliminada);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar la categoría' });
    }
  };
  
  module.exports = {
    getCategoria,
    createCategoria,
    updateCategoria,
    deleteCategoria
  };