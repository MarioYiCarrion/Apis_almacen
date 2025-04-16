// routes/dashboardRoutes.js
const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

// Ruta para obtener el dashboard
router.get('/productos', dashboardController.obtenerDashboard);

module.exports = router;
