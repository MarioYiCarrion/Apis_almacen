const db = require('../db/connection');

// Obtener todos los tipos de producto
exports.getTiposProducto = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM tipoproducto');
    res.json(results);
  } catch (err) {
    console.error("Error al obtener tipos de producto:", err);
    res.status(500).json({ error: err.message });
  }
};

// Crear un nuevo tipo de producto
exports.createTipoProducto = async (req, res) => {
  const { nombre } = req.body;

  try {
    const [result] = await db.query('INSERT INTO tipoproducto (nombre) VALUES (?)', [nombre]);
    res.json({ id: result.insertId, nombre });
  } catch (err) {
    console.error("Error al crear tipo de producto:", err);
    res.status(500).json({ error: err.message });
  }
};

// Eliminar un tipo de producto
exports.deleteTipoProducto = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query('DELETE FROM tipoproducto WHERE id = ?', [id]);
    res.json({ mensaje: 'Tipo de producto eliminado correctamente' });
  } catch (err) {
    console.error("Error al eliminar tipo de producto:", err);
    res.status(500).json({ error: err.message });
  }
};
