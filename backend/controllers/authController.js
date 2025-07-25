// backend/controllers/authController.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../config/db.js';
import dotenv from 'dotenv';

dotenv.config();

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [result] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    if (result.length === 0) {
      return res.status(401).json({ message: 'User not found' });
    }

    const user = result[0]; // ✅ Define before logging

    // 🔍 Debugging logs
    console.log('Login attempt with password:', password);
    console.log('Hash from database:', user.password_hash);
    console.log('Request Body:', req.body);

    const isMatch = await bcrypt.compare(password, user.password_hash);

    console.log('bcrypt result (password match):', isMatch);

    if (!isMatch) {
      return res.status(403).json({ message: 'Incorrect password' });
    }

    const token = jwt.sign(
      { id: user.id, role_id: user.role_id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token, role_id: user.role_id });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error during login' });
  }
};