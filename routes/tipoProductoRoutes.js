const express = require('express');
const router = express.Router();
const tipoProductoController = require('../controllers/tipoProductoController');

router.get('/', tipoProductoController.getTiposProducto);
router.post('/', tipoProductoController.createTipoProducto);
router.delete('/:id', tipoProductoController.deleteTipoProducto);

module.exports = router;
