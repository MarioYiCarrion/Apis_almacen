const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

// Obtener productos por usuario
router.get('/usuario/:usuarioId', productoController.getproductosByusuario);

// Crear un nuevo producto
router.post('/', productoController.createproducto);

// Actualizar producto
router.put('/:id', productoController.updateproducto);

// Eliminar producto
router.delete('/:id', productoController.deleteproducto);

module.exports = router;
