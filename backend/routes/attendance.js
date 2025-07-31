// routes/attendance.js
import express from 'express';
import db from '../config/db.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT 
        a.id,
        e.full_name AS employeeName,
        a.date,
        a.status,
        TIME_FORMAT(a.check_in, '%h:%i %p') AS checkIn,
        TIME_FORMAT(a.check_out, '%h:%i %p') AS checkOut,
        a.hours_worked AS hours
      FROM attendance a
      JOIN employees e ON a.employee_id = e.id
      ORDER BY a.date DESC
    `);
    res.json(rows);
  } catch (err) {
    console.error('Error fetching attendance:', err);
    res.status(500).json({ error: 'Failed to retrieve attendance' });
  }
});

export default router;
