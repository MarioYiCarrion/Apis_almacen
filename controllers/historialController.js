const db = require('../db/connection');

exports.obtenerHistorial = async (req, res) => {
  const { producto } = req.query; // Ej: ?producto=Pollo

  try {
    let query = 'SELECT * FROM HistorialMovimientos';
    let params = [];

    if (producto) {
      query += ' WHERE producto LIKE ?';
      params.push(`%${producto}%`);
    }

    query += ' ORDER BY fecha DESC';

    const [rows] = await db.query(query, params);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el historial', error });
  }
};
