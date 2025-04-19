const express = require('express');
const router = express.Router();
const unidadController = require('../controllers/unidadMedidaController');

router.get('/', unidadController.getUnidades);
router.put('/:id', unidadController.updateUnidad);
router.delete('/:id', unidadController.deleteUnidad);

module.exports = router;
