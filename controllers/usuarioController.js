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
    const hashedPassword = await bcrypt.hash(contrasena, 10);
    db.query(
      'INSERT INTO usuario (nombre, correo, rol, contrasena) VALUES (?, ?, ?, ?)',
      [nombre, correo, rol, hashedPassword],
      (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: result.insertId, nombre, correo, rol });
      }
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar un usuario
exports.deleteUsuario = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM usuario WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ mensaje: 'Usuario eliminado correctamente' });
  });
};
