import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import pool from './config/db.js';
import authRoutes from './routes/auth.js';
import dashboardRoutes from './routes/dashboard.js';
import attendanceRoutes from './routes/attendance.js';  //  importar
import userRoutes from './routes/user.js';




dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(express.json());

// Rutas
app.use('/api', authRoutes);
app.use('/api', dashboardRoutes);
app.use('/api', attendanceRoutes); // montar
app.use('/api', userRoutes);

// Conectar a la base de datos y arrancar el servidor
(async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('✅ Conexión a PostgreSQL exitosa');
    console.log('Hora actual en la base de datos:', res.rows[0]);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Error al conectar con PostgreSQL:', err);
  }
})();
