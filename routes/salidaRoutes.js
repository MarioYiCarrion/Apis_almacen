const express = require('express');
const router = express.Router();
const salidaController = require('../controllers/salidaController');

// Obtener salidas por usuario
router.get('/usuario/:usuarioId', salidaController.getSalidasByUsuario);

// Crear una nueva salida
router.post('/', salidaController.createSalida);

module.exports = router;
