// controllers/dashboardController.js
const db = require('../db/connection');  // Asegúrate de que la conexión a la base de datos esté configurada

// Controlador para obtener el dashboard
exports.obtenerDashboard = async (req, res) => {
  let query = `
    SELECT 
      p.nombre AS producto, 
      m.nombre AS marca,
      SUM(CASE WHEN i.fecha IS NOT NULL THEN i.cantidad ELSE 0 END) AS ingresos,
      SUM(CASE WHEN s.fecha IS NOT NULL THEN s.cantidad ELSE 0 END) AS salidas,
      MAX(IFNULL(st.cantidad, 0)) AS stock_actual
    FROM Producto p
    LEFT JOIN Marca m ON p.marca_id = m.id
    LEFT JOIN Ingreso i ON p.id = i.producto_id
    LEFT JOIN Salida s ON p.id = s.producto_id
    LEFT JOIN Stock st ON p.id = st.producto_id
    WHERE 1
  `;

  const params = [];

  // Filtros de la fecha
  const { fecha, producto_id, tipo } = req.query;

  if (fecha) {
    query += ' AND (DATE(i.fecha) = ? OR DATE(s.fecha) = ?)';
    params.push(fecha, fecha);
  }

  if (producto_id) {
    query += ' AND p.id = ?';
    params.push(producto_id);
  }

  if (tipo) {
    if (tipo === 'Ingreso') {
      query += ' AND i.fecha IS NOT NULL';
    } else if (tipo === 'Salida') {
      query += ' AND s.fecha IS NOT NULL';
    }
  }

  query += ' GROUP BY p.id, m.nombre';

  try {
    const [rows] = await db.query(query, params);  // Ejecutar la consulta
    res.json(rows);  // Devolver los resultados
  } catch (error) {
    console.error("Error al obtener el dashboard:", error);  // Registrar el error en consola
    res.status(500).json({ mensaje: "Error al obtener el dashboard", error: error.message });
  }
};
