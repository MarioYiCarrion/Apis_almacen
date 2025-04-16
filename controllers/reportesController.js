const db = require('../db/connection');
const ExcelJS = require('exceljs');

exports.reporteHistorialExcel = async (req, res) => {
  const { fecha } = req.query; // Ej: 2025-04-12

  try {
    let query = `SELECT * FROM HistorialMovimientos`;
    let params = [];

    if (fecha) {
      query += ' WHERE DATE(fecha) = ?';
      params.push(fecha);
    }

    query += ' ORDER BY fecha DESC';

    const [rows] = await db.query(query, params);

    // Crear workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Historial');

    // Encabezados
    worksheet.columns = [
      { header: 'Tipo', key: 'tipo', width: 15 },
      { header: 'Fecha', key: 'fecha', width: 20 },
      { header: 'Producto', key: 'producto', width: 30 },
      { header: 'Marca', key: 'marca', width: 25 },
      { header: 'Cantidad', key: 'cantidad', width: 15 },
      { header: 'Usuario', key: 'usuario', width: 25 }
    ];

    // Agregar filas
    rows.forEach(row => worksheet.addRow(row));

    // Enviar archivo
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=historial_${fecha || 'completo'}.xlsx`);

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al generar el reporte', error });
  }
};
