// routes/attendance.js
import express from 'express';
import { registerAttendance, getAllAttendances } from '../controllers/attendanceController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Ruta para registrar asistencia
router.post('/attendance', verifyToken, registerAttendance);

// Ruta para obtener todas las asistencias
router.get('/attendance', verifyToken, getAllAttendances);

export default router;
