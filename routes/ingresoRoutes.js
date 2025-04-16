const express = require('express');
const router = express.Router();
const ingresoController = require('../controllers/ingresoController');

// Obtener ingresos por usuario
router.get('/usuario/:usuarioId', ingresoController.getIngresosByUsuario);

// Crear un nuevo ingreso
router.post('/', ingresoController.createIngreso);

module.exports = router;
