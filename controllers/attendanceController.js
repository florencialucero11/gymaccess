import pool from '../config/db.js';

// Registrar asistencia (check-in), solo una vez por día
export const registerAttendance = async (req, res) => {
  const userId = req.user.id;
  const { method } = req.body;

  try {
    // Verificar si ya hay check-in para hoy
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const existing = await pool.query(
      `SELECT * FROM attendances 
       WHERE user_id = $1 AND check_in BETWEEN $2 AND $3`,
      [userId, todayStart, todayEnd]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({ message: 'Ya registraste asistencia hoy' });
    }

    // Insertar nueva asistencia
    const newAttendance = await pool.query(
      'INSERT INTO attendances (user_id, method) VALUES ($1, $2) RETURNING *',
      [userId, method || 'QR']
    );

    res.status(201).json({ message: 'Asistencia registrada ✅', attendance: newAttendance.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar asistencia' });
  }
};

// Listar todas las asistencias (para admin o usuario)
export const getAllAttendances = async (req, res) => {
  try {
    const attendances = await pool.query(`
      SELECT a.id, a.user_id, u.name, a.check_in, a.method
      FROM attendances a
      JOIN users u ON a.user_id = u.id
      ORDER BY a.check_in DESC
    `);
    res.json(attendances.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener asistencias' });
  }
};
