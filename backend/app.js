import express from 'express';
import cors from 'cors';

import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import employeeRoutes from './routes/employees.js';
import payrollRoutes from './routes/payroll.js';
import leaveRoutes from './routes/leave.js';
import performanceRoutes from './routes/performance.js';
import attendanceRoutes from './routes/attendance.js';
import departmentRoutes from './routes/departments.js'; // ✅ ADD THIS

const app = express();

app.use(cors());
app.use(express.json());

// Route mounting
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/payroll', payrollRoutes);
app.use('/api/leave', leaveRoutes);
app.use('/api/performance-reviews', performanceRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/departments', departmentRoutes); // ✅ ADD THIS LINE

app.listen(3000, () => {
  console.log('✅ Backend server is running on port 3000');
});
