const db = require('../db/connection');

// Obtener todas las marcas
exports.getMarcas = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM marca');
    res.json(results);
  } catch (err) {
    console.error("Error al obtener marcas:", err);
    res.status(500).json({ error: err.message });
  }
};

// Crear una nueva marca
exports.createMarca = async (req, res) => {
  const { nombre } = req.body;

  try {
    const [result] = await db.query('INSERT INTO marca (nombre) VALUES (?)', [nombre]);
    res.json({ id: result.insertId, nombre });
  } catch (err) {
    console.error("Error al crear marca:", err);
    res.status(500).json({ error: err.message });
  }
};

// Actualizar una marca
exports.updateMarca = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;

  try {
    await db.query('UPDATE marca SET nombre = ? WHERE id = ?', [nombre, id]);
    res.json({ mensaje: 'Marca actualizada correctamente' });
  } catch (err) {
    console.error("Error al actualizar marca:", err);
    res.status(500).json({ error: err.message });
  }
};

// Eliminar una marca
exports.deleteMarca = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query('DELETE FROM marca WHERE id = ?', [id]);
    res.json({ mensaje: 'Marca eliminada correctamente' });
  } catch (err) {
    console.error("Error al eliminar marca:", err);
    res.status(500).json({ error: err.message });
  }
};
