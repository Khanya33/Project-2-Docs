import express from 'express';
import db from '../config/db.js';

const router = express.Router();

// 🔹 Raw/dev view
router.get('/employees', async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT
        employees.*,
        users.email AS user_email,
        users.role AS user_role
      FROM employees
      JOIN users ON employees.user_id = users.id
    `);
    res.json(rows);
  } catch (err) {
    console.error('Error fetching employees with user data:', err);
    res.status(500).send('Server error');
  }
});

// 🔹 Main frontend-facing view
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        e.id AS id,
        e.full_name AS employee_name,
        u.username AS job_title,
        d.name AS team,
        p.base_salary,
        e.email AS email_address,
        e.contact_number AS mobile
      FROM employees e
      LEFT JOIN users u ON e.user_id = u.id
      LEFT JOIN departments d ON e.department_id = d.id
      LEFT JOIN payroll p ON e.id = p.employee_id
    `);
    const enrichedRows = rows.map(emp => ({
      ...emp,
      job_title: emp.job_title || 'Not Assigned',
      base_salary: emp.base_salary ?? 0
    }));
    res.json(enrichedRows);
  } catch (err) {
    console.error('Error fetching employees:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 🔹 Admin view
router.get('/admin', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        e.id, e.full_name, e.email,
        u.role AS user_role,
        d.name AS department,
        p.base_salary
      FROM employees e
      LEFT JOIN users u ON e.user_id = u.id
      LEFT JOIN departments d ON e.department_id = d.id
      LEFT JOIN payroll p ON e.id = p.employee_id
    `);
    const mappedEmployees = rows.map(emp => ({
      id: emp.id,
      name: emp.full_name,
      email: emp.email,
      role: emp.user_role || 'Staff',
      department: emp.department || 'N/A',
      salary: emp.base_salary ?? 0
    }));
    res.json(mappedEmployees);
  } catch (err) {
    console.error('Error fetching employee data:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// 🔹 Employee creation route
router.post('/', async (req, res) => {
  const {
    full_name,
    dob,
    contact_number,
    email,
    address,
    department_id,
    user_id,
    date_joined,
    employment_type
  } = req.body;

  try {
    const [result] = await db.execute(
      `INSERT INTO employees 
       (full_name, dob, contact_number, email, address, department_id, user_id, date_joined, employment_type)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [full_name, dob, contact_number, email, address, department_id, user_id, date_joined, employment_type]
    );
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
