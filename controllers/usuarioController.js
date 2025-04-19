const db = require('../db/connection');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

exports.loginUsuario = (req, res) => {
  const { correo, contrasena } = req.body;

  db.query('SELECT * FROM usuario WHERE correo = ?', [correo], async (err, results) => {
    if (err) return res.status(500).json({ error: 'Error en el servidor' });

    if (results.length === 0) {
      return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
    }

    const usuario = results[0];
    const match = await bcrypt.compare(contrasena, usuario.contrasena);

    if (!match) {
      return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
    }

    // Puedes generar un token JWT si lo deseas, por ahora devolvemos los datos
    res.json({
      id: usuario.id,
      nombre: usuario.nombre,
      correo: usuario.correo,
      rol: usuario.rol
    });
  });
};