const express = require('express');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/api', dashboardRoutes);

// Rutas
app.use('/api/productos', require('./routes/productoRoutes'));
app.use('/api/ingresos', require('./routes/ingresoRoutes'));
app.use('/api/salidas', require('./routes/salidaRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/historial', require('./routes/historialRoutes'));
app.use('/api/stock', require('./routes/stockRoutes'));
app.use('/api/reportes', require('./routes/reportesRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
