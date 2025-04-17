const db = require('../db/connection');

// Crear una salida
exports.createSalida = async (req, res) => {
  const { producto_id, cantidad, usuario_id } = req.body;
  try {
    const [result] = await db.query(`
      INSERT INTO salida (producto_id, cantidad, usuario_id)
      VALUES (?, ?, ?)
    `, [producto_id, cantidad, usuario_id]);

    res.status(201).json({
      mensaje: 'Salida registrada con éxito',
      salida: { id: result.insertId, producto_id, cantidad, usuario_id }
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar salida', error });
  }
};

// Obtener salidas por usuario
exports.getSalidasByUsuario = async (req, res) => {
  const { usuarioId } = req.params;
  try {
    const [rows] = await db.query(`
      SELECT s.*, p.nombre AS producto
      FROM salida s
      JOIN producto p ON s.producto_id = p.id
      WHERE s.usuario_id = ?
    `, [usuarioId]);

    res.json(rows);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener salidas', error });
  }
};
