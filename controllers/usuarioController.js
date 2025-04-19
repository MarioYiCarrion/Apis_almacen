const db = require('../db/connection');
const bcrypt = require('bcryptjs');

// Obtener todos los usuarios
exports.getUsuarios = async (req, res) => {
  try {
    // Usamos await para resolver la promesa de la consulta
    const [results] = await db.query('SELECT id, nombre, correo, rol FROM usuario');
    res.json(results);
  } catch (err) {
    console.error("Error en la consulta:", err);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};

// Crear un nuevo usuario (encriptando la contraseña)
exports.createUsuario = async (req, res) => {
  const { nombre, correo, rol, contrasena } = req.body;

  try {
    // Encriptamos la contraseña
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    // Usamos await para la consulta de inserción
    const [result] = await db.query(
      'INSERT INTO usuario (nombre, correo, rol, contrasena) VALUES (?, ?, ?, ?)',
      [nombre, correo, rol, hashedPassword]
    );

    // Retornamos la respuesta con el usuario creado
    res.json({ id: result.insertId, nombre, correo, rol });
  } catch (err) {
    console.error("Error al crear el usuario:", err);
    res.status(500).json({ error: err.message });
  }
};

// Eliminar un usuario
exports.deleteUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    // Usamos await para la consulta de eliminación
    await db.query('DELETE FROM usuario WHERE id = ?', [id]);
    res.json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (err) {
    console.error("Error al eliminar el usuario:", err);
    res.status(500).json({ error: err.message });
  }
};
