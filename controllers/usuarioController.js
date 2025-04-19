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

exports.loginUsuario = async (req, res) => {
  const { correo, contrasena } = req.body;

  try {
    const [rows] = await db.query('SELECT * FROM usuario WHERE correo = ?', [correo]);
    const usuario = rows[0];

    if (!usuario) {
      return res.status(401).json({ error: 'Correo no registrado' });
    }

    const passwordValida = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!passwordValida) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Opcional: Generar token
    const token = jwt.sign(
      { id: usuario.id, correo: usuario.correo, rol: usuario.rol },
      'tu_clave_secreta', // 🔐 cámbiala por una segura (idealmente en .env)
      { expiresIn: '2h' }
    );

    res.json({
      mensaje: 'Inicio de sesión exitoso',
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol
      },
      token // Enviar el token al cliente
    });

  } catch (err) {
    console.error("Error al iniciar sesión:", err);
    res.status(500).json({ error: 'Error en el servidor al iniciar sesión' });
  }
};
