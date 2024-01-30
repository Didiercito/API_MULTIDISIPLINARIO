const  Usuario = require ('../models/usuarios.models');


const  getUsuario = async (req,res)  =>{
    try {
        const usuarios = await Usuario.find()
        res.json(usuarios);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error');
    }
};


const createUsuario = async (req,res) =>{
    const {id_usuario, nombre, apellido, contrasena, telefono, direccion, correo} = req.body;

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

}

const updateUsuario =  (req,res) =>{
    res.send('Actualizando usuario');
}



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


module.exports = {

getUsuario,
createUsuario,
updateUsuario,
deleteUsuario,
searchUserByName
};