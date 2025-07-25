// backend/app.js — Khanya's refined setup
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import employeeRoutes from './routes/employees.js';
import payrollRoutes from './routes/payroll.js';
import leaveRoutes from './routes/leave.js';




const app = express(); // Define app before mounting routes

app.use(cors());
app.use(express.json());
app.use('/api/payroll', payrollRoutes);
app.use('/api/leave', leaveRoutes);


// Mount routes after middleware
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);

app.listen(3000, () => {
  console.log('Backend server is running on port 3000');
});