const db = require('../db');

exports.getMarcas = (req, res) => {
  db.query('SELECT * FROM marca', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.createMarca = (req, res) => {
  const { nombre } = req.body;
  db.query('INSERT INTO marca (nombre) VALUES (?)', [nombre], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId, nombre });
  });
};

exports.updateMarca = (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  db.query('UPDATE marca SET nombre = ? WHERE id = ?', [nombre, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ mensaje: 'Marca actualizada correctamente' });
  });
};

exports.deleteMarca = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM marca WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ mensaje: 'Marca eliminada correctamente' });
  });
};
