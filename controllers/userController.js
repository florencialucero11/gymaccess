// controllers/userController.js
import pool from '../config/db.js';

// Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name, email, role FROM users ORDER BY id ASC');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
};

// Obtener un usuario por ID
export const getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query('SELECT id, name, email, role FROM users WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener usuario' });
  }
};

// Crear nuevo usuario
export const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ message: 'El email ya está registrado' });
    }

    const newUser = await pool.query(
      'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
      [name, email, password, role || 'user']
    );
    res.status(201).json(newUser.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear usuario' });
  }
};

// Actualizar usuario
export const updateUser = async (req, res) => {
  const id = req.params.id;
  const { name, email, role } = req.body;
  try {
    const updated = await pool.query(
      'UPDATE users SET name = $1, email = $2, role = $3 WHERE id = $4 RETURNING id, name, email, role',
      [name, email, role, id]
    );
    if (updated.rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(updated.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar usuario' });
  }
};

// Eliminar usuario
export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await pool.query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);
    if (deleted.rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json({ message: 'Usuario eliminado', id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar usuario' });
  }
};
