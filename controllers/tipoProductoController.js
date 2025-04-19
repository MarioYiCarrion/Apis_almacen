const db = require('../db/connection');

// Obtener todos los tipos de producto
exports.getTiposProducto = (req, res) => {
  db.query('SELECT * FROM tipoproducto', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Crear un nuevo tipo de producto
exports.createTipoProducto = (req, res) => {
  const { nombre } = req.body;
  db.query('INSERT INTO tipoproducto (nombre) VALUES (?)', [nombre], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId, nombre });
  });
};

// Eliminar un tipo de producto
exports.deleteTipoProducto = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM tipoproducto WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ mensaje: 'Tipo de producto eliminado correctamente' });
  });
};
