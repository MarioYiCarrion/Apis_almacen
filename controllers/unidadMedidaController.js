const db = require('../db/connection');

// Obtener todas las unidades de medida
exports.getUnidades = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM unidad_medida');
    res.json(results);
  } catch (err) {
    console.error("Error al obtener unidades de medida:", err);
    res.status(500).json({ error: err.message });
  }
};

// Actualizar una unidad de medida
exports.updateUnidad = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;

  try {
    const [result] = await db.query('UPDATE unidad_medida SET nombre = ? WHERE id = ?', [nombre, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Unidad de medida no encontrada' });
    }
    res.json({ mensaje: 'Unidad de medida actualizada correctamente' });
  } catch (err) {
    console.error("Error al actualizar unidad de medida:", err);
    res.status(500).json({ error: err.message });
  }
};

// Eliminar una unidad de medida
exports.deleteUnidad = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM unidad_medida WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Unidad de medida no encontrada' });
    }
    res.json({ mensaje: 'Unidad de medida eliminada correctamente' });
  } catch (err) {
    console.error("Error al eliminar unidad de medida:", err);
    res.status(500).json({ error: err.message });
  }
};
