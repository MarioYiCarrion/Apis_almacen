  const db = require('../db/connection');

  // Crear un ingreso
  exports.createIngreso = async (req, res) => {
    const { producto_id, cantidad, marca_id, fecha, usuario_id } = req.body;
    try {
      const [result] = await db.query(`
        INSERT INTO ingreso (producto_id, marca_id, cantidad, fecha, usuario_id)
        VALUES (?, ?, ?, ?, ?)
      `, [producto_id, cantidad, marca_id, fecha,  usuario_id]);

      res.status(201).json({
        mensaje: 'Ingreso registrado con éxito',
        ingreso: { id: result.insertId, producto_id, cantidad, marca_id, fecha, usuario_id }
      });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al registrar ingreso', error });
    }
  };

  // Obtener ingresos por usuario
  exports.getIngresosByUsuario = async (req, res) => {
    const { usuarioId } = req.params;
    try {
      const [rows] = await db.query(`
        SELECT i.*, p.nombre AS producto
        FROM ingreso i
        JOIN producto p ON i.producto_id = p.id
        WHERE i.usuario_id = ?
      `, [usuarioId]);

      res.json(rows);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al obtener ingresos', error });
    }
  };
