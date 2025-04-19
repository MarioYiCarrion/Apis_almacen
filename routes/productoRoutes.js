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

// obtener productos por tipo
app.get('/api/productos/tipo/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const [rows] = await connection.query(
        'SELECT * FROM producto WHERE id_tipoproducto = ?',
        [id]
      );
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener productos' });
    }
  });

module.exports = router;
