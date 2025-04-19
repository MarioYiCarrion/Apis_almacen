const db = require('../db/connection');
const bcrypt = require('bcryptjs');

// Obtener todos los usuarios
exports.getUsuarios = async (req, res) => {
  try {
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

    const [result] = await db.query(
      'INSERT INTO usuario (nombre, correo, rol, contrasena) VALUES (?, ?, ?, ?)',
      [nombre, correo, rol, hashedPassword]
    );

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
    await db.query('DELETE FROM usuario WHERE id = ?', [id]);
    res.json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (err) {
    console.error("Error al eliminar el usuario:", err);
    res.status(500).json({ error: err.message });
  }
};

// Login de usuario
exports.loginUsuario = async (req, res) => {
  const { correo, contrasena } = req.body;

  try {
    const [results] = await db.query('SELECT * FROM usuario WHERE correo = ?', [correo]);

    if (results.length === 0) {
      return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
    }

    const usuario = results[0];
    const match = await bcrypt.compare(contrasena, usuario.contrasena);

    if (!match) {
      return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
    }

    res.json({
      id: usuario.id,
      nombre: usuario.nombre,
      correo: usuario.correo,
      rol: usuario.rol
    });
  } catch (err) {
    console.error("Error en el login:", err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};
