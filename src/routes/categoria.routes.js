const { Router } = require('express');
const router = Router();
const categoriaControllers = require('../controllers/categoria.controllers');


router.get('/', categoriaControllers.getCategoria);

router.post('/', categoriaControllers.createCategoria);

router.delete ('/:id_categoria', categoriaControllers.deleteCategoria);




module.exports = router;