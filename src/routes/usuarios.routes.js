    const { Router } = require('express');
    const router = Router();
    const usuarioControllers = require('../controllers/usuarios.controllers')

    router.get('/', usuarioControllers.getUsuario);

    router.get('/buscar/:letra', usuarioControllers.searchUserByName);

    router.get('/:id_usuario', usuarioControllers.getUsuarioById);

    router.post('/', usuarioControllers.createUsuario);

    router.put('/:id_usuario', usuarioControllers.updateUsuario);

    router.delete('/:id_usuario', usuarioControllers.deleteUsuario);

    router.post('/:id_usuario/agregar-carrito/:id_producto', usuarioControllers.addToCart);

    module.exports = router;
