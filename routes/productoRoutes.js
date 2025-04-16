const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

// Obtener productos por usuario
router.get('/usuario/:usuarioId', productoController.getProductosByUsuario);

// Crear un nuevo producto
router.post('/', productoController.createProducto);

// Actualizar producto
router.put('/:id', productoController.updateProducto);

// Eliminar producto
router.delete('/:id', productoController.deleteProducto);

module.exports = router;
