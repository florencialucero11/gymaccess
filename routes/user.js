import express from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from '../controllers/userController.js';
import { verifyToken, verifyRole } from '../middleware/authMiddleware.js';

const router = express.Router();

// ✅ Listar todos los usuarios (solo admin)
router.get('/users', verifyToken, verifyRole(['admin']), getAllUsers);

// ✅ Obtener un usuario por ID (solo admin)
router.get('/users/:id', verifyToken, verifyRole(['admin']), getUserById);

// ✅ Crear un nuevo usuario (solo admin)
router.post('/users', verifyToken, verifyRole(['admin']), createUser);

// ✅ Actualizar usuario (solo admin)
router.put('/users/:id', verifyToken, verifyRole(['admin']), updateUser);

// ✅ Eliminar usuario (solo admin)
router.delete('/users/:id', verifyToken, verifyRole(['admin']), deleteUser);

export default router;
