    const { Router } = require('express');
    const router = Router();
    const usuarioControllers = require('../controllers/usuarios.controllers')

    router.get('/', usuarioControllers.getUsuario);

    router.post('/', usuarioControllers.createUsuario);

    router.put('/', usuarioControllers.updateUsuario);

    router.delete('/:id_usuario', usuarioControllers.deleteUsuario);

    router.get('/buscar/:letra', usuarioControllers.searchUserByName);

    module.exports = router;
