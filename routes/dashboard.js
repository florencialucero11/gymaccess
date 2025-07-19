import express from 'express';
import { verifyToken, verifyRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/admin-panel', verifyToken, verifyRole(['admin']), (req, res) => {
  res.json({
    message: 'Bienvenido al panel de administración 🔐',
    user: req.user
  });
});

export default router;
