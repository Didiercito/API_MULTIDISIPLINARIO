const { Router } = require('express');
const router = Router();
const categoriaControllers = require('../controllers/categoria.controllers');


router.get('/', categoriaControllers.getCategoria);

router.post('/', categoriaControllers.createCategoria);




module.exports = router;