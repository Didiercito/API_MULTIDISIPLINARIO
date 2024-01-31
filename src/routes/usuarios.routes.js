    const { Router } = require('express');
    const router = Router();
    const usuarioControllers = require('../controllers/usuarios.controllers')

    router.get('/', usuarioControllers.getUsuario);

    router.post('/', usuarioControllers.createUsuario);

    router.put('/:id_usuario', usuarioControllers.updateUsuario);

    router.delete('/:id_usuario', usuarioControllers.deleteUsuario);

    router.get('/buscar/:letra', usuarioControllers.searchUserByName);

    router.post('/:id_usuario/agregar-carrito', usuarioControllers.addToCart);

    module.exports = router;
