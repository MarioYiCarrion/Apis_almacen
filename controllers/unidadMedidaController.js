const db = require('../db');

// Obtener todas las unidades de medida
exports.getUnidades = (req, res) => {
  db.query('SELECT * FROM unidad_medida', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Actualizar una unidad de medida
exports.updateUnidad = (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  db.query('UPDATE unidad_medida SET nombre = ? WHERE id = ?', [nombre, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ mensaje: 'Unidad de medida actualizada correctamente' });
  });
};

// Eliminar una unidad de medida
exports.deleteUnidad = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM unidad_medida WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ mensaje: 'Unidad de medida eliminada correctamente' });
  });
};
