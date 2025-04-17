const db = require('../db/connection');

exports.obtenerStock = async (req, res) => {
  const { producto } = req.query;

  try {
    let query = `
      SELECT 
        p.nombre AS producto,
        m.nombre AS marca,
        s.cantidad
      FROM stock s
      JOIN producto p ON s.producto_id = p.id
      JOIN marca m ON s.marca_id = m.id
    `;
    let params = [];

    if (producto) {
      query += ' WHERE p.nombre LIKE ?';
      params.push(`%${producto}%`);
    }

    query += ' ORDER BY p.nombre';

    const [rows] = await db.query(query, params);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el stock', error });
  }
};
