const db = require('../db/connection');

exports.login = async (req, res) => {
  const { correo, contrasena } = req.body;

  try {
    const [rows] = await db.query(
      'SELECT * FROM usuario WHERE correo = ? AND contrasena = ?',
      [correo, contrasena]
    );

    if (rows.length === 0) {
      return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }

    const usuario = rows[0];

    res.json({
      mensaje: 'Login exitoso',
      usuario: {
        id: usuario.id_usuaio,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol
      }
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al procesar la solicitud', error });
  }
};
