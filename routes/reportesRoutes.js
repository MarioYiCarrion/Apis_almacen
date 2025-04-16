const express = require('express');
const router = express.Router();
const reportesController = require('../controllers/reportesController');

router.get('/historial/excel', reportesController.reporteHistorialExcel);

module.exports = router;
