const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.get('/', usuarioController.getUsuarios);
router.post('/', usuarioController.createUsuario);
router.delete('/:id', usuarioController.deleteUsuario);
router.post('/login', usuarioController.loginUsuario);

module.exports = router;
