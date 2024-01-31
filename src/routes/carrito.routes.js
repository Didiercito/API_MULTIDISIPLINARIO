const { Router } = require('express');
const router = Router();
const carritoControllers = require('../controllers/carrito.contollers');

router.post('/carrito/addToCart', carritoControllers.addToCart);

router.post('/carrito/removeFromCart', carritoControllers.removeFromCart);

router.get('/carrito/searchProductInCartByName/:id_usuario/:nombre_producto', carritoControllers.searchProductInCartByName);


module.exports = router;