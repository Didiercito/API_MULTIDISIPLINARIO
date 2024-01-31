const {Router} = require('express');
const router = Router();
const productoController = require('../controllers/producto.controllers');


router.get('/', productoController.getProducto);

router.get('/por-categoria/:id_categoria', productoController.getProductsByCategory);

router.get('/buscar/:nombre_producto', productoController.searchProductoByName);

router.post('/', productoController.createProducto);

router.put('/:id_producto', productoController.updateProducto);

router.delete('/:id_producto', productoController.deleteProducto);



module.exports = router;