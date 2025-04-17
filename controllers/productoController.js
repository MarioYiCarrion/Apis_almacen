const db = require('../db/connection');

// Crear un nuevo producto
exports.createProducto = async (req, res) => {
  const { nombre, tipo_producto_id, unidad_medida_id, marca_id } = req.body;
  try {
    const [result] = await db.query(`
      INSERT INTO producto (nombre, tipo_producto_id, unidad_medida_id, marca_id)
      VALUES (?, ?, ?, ?)
    `, [nombre, tipo_producto_id, unidad_medida_id, marca_id]);

    res.status(201).json({
      mensaje: 'Producto creado con éxito',
      producto: { id: result.insertId, nombre, tipo_producto_id, unidad_medida_id, marca_id }
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear producto', error });
  }
};

// Obtener productos por usuario
exports.getProductosByUsuario = async (req, res) => {
  const { usuarioId } = req.params;
  try {
    const [rows] = await db.query(`
      SELECT p.*, t.nombre AS tipo, u.nombre AS unidad, m.nombre AS marca
      FROM producto p
      JOIN tipoproducto t ON p.tipo_producto_id = t.id
      JOIN unidadmedida u ON p.unidad_medida_id = u.id
      JOIN marca m ON p.marca_id = m.id
      WHERE EXISTS (
        SELECT 1 FROM Ingreso i WHERE i.producto_id = p.id AND i.usuario_id = ?
        UNION
        SELECT 1 FROM Salida s WHERE s.producto_id = p.id AND s.usuario_id = ?
      )
    `, [usuarioId, usuarioId]);

    res.json(rows);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener productos', error });
  }
};

// Actualizar un producto
exports.updateProducto = async (req, res) => {
  const { id } = req.params;
  const { nombre, tipo_producto_id, unidad_medida_id, marca_id } = req.body;
  try {
    await db.query(`
      UPDATE producto
      SET nombre = ?, tipo_producto_id = ?, unidad_medida_id = ?, marca_id = ?
      WHERE id = ?
    `, [nombre, tipo_producto_id, unidad_medida_id, marca_id, id]);

    res.json({ mensaje: 'Producto actualizado con éxito' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar producto', error });
  }
};

// Eliminar un producto
exports.deleteProducto = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query(`
      DELETE FROM producto WHERE id = ?
    `, [id]);

    res.json({ mensaje: 'Producto eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar producto', error });
  }
};
