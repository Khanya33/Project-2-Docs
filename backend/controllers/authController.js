// backend/controllers/authController.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../config/db.js';
import dotenv from 'dotenv';

dotenv.config();

// LOGIN
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [result] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    if (result.length === 0) {
      return res.status(401).json({ message: 'User not found' });
    }

    const user = result[0];

    const isMatch = await bcrypt.compare(password, user.password_hash);

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

// SIGNUP
export const signupUser = async (req, res) => {
  const { full_name, username, email, password } = req.body;

  if (!full_name || !username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const [existingEmail] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existingEmail.length > 0) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const [existingUsername] = await db.query('SELECT id FROM users WHERE username = ?', [username]);
    if (existingUsername.length > 0) {
      return res.status(409).json({ message: 'Username already taken' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const defaultRoleId = 3; // Default to 'employee' role

    // Insert into `users`
    const [userResult] = await db.query(
      `INSERT INTO users (username, email, password_hash, role_id) VALUES (?, ?, ?, ?)`,
      [username, email, hashedPassword, defaultRoleId]
    );

    const newUserId = userResult.insertId;

    // Insert into `employees` with full_name
    await db.query(
      `INSERT INTO employees (user_id, full_name) VALUES (?, ?)`,
      [newUserId, full_name]
    );

    res.status(201).json({ message: 'Signup successful' });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Server error during signup' });
  }
};
