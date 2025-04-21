const db = require('../db/connection');

// Crear un nuevo producto
exports.createproducto = async (req, res) => {
  const { nombre, tipo_producto_id, unidad_medida_id} = req.body;
  try {
    const [result] = await db.query(`
      INSERT INTO producto (nombre, tipo_producto_id, unidad_medida_id)
      VALUES (?, ?, ?)
    `, [nombre, tipo_producto_id, unidad_medida_id]);

    res.status(201).json({
      mensaje: 'Producto creado con éxito',
      producto: { id: result.insertId, nombre, tipo_producto_id, unidad_medida_id }
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear producto', error });
  }
};

// Actualizar un producto
exports.updateproducto = async (req, res) => {
  const { id } = req.params;
  const { nombre, tipo_producto_id, unidad_medida_id } = req.body;
  try {
    await db.query(`
      UPDATE producto
      SET nombre = ?, tipo_producto_id = ?, unidad_medida_id = ?
      WHERE id = ?
    `, [nombre, tipo_producto_id, unidad_medida_id, id]);

    res.json({ mensaje: 'Producto actualizado con éxito' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar producto', error });
  }
};

// Eliminar un producto
exports.deleteproducto = async (req, res) => {
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

// Obtener productos por tipo de producto
exports.getProductosPorTipo = async (req, res) => {
  const { tipoId } = req.params;
  try {
    const [rows] = await db.query(`
      SELECT p.nombre
      FROM producto p
      WHERE p.tipo_producto_id = ?
    `, [tipoId]);

    res.json(rows);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener productos por tipo', error });
  }
};

