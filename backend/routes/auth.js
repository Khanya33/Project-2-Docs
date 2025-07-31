// backend/routes/auth.js
import express from 'express';
import { loginUser, signupUser } from '../controllers/authController.js'; // Add signup controller

const router = express.Router();

// POST /api/auth/login
router.post('/login', loginUser);

// POST /api/auth/signup
router.post('/signup', signupUser);

export default router;