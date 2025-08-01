import express from 'express';
import db from '../config/db.js';
import validator from 'validator';  // Added for input validation

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
        e.salary AS base_salary,          -- salary is now in employees table
        e.email AS email_address,
        e.contact_number AS mobile
      FROM employees e
      LEFT JOIN users u ON e.user_id = u.id
      LEFT JOIN departments d ON e.department_id = d.id
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
        e.salary AS base_salary          -- salary is now in employees table
      FROM employees e
      LEFT JOIN users u ON e.user_id = u.id
      LEFT JOIN departments d ON e.department_id = d.id
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

// 🔹 Update employee details with validation
router.post('/update', async (req, res) => {
  const {
    id,
    email,
    contact_number,
    address,
    department_id,
    employment_type,
    salary
  } = req.body;

  // Basic validation
  if (!id || typeof id !== 'number') {
    return res.status(400).json({ error: 'Invalid or missing employee ID' });
  }

  if (email && !validator.isEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  if (salary !== undefined && (isNaN(salary) || Number(salary) < 0)) {
    return res.status(400).json({ error: 'Salary must be a positive number' });
  }

  try {
    const [result] = await db.execute(
      `UPDATE employees
       SET email = ?, contact_number = ?, address = ?, department_id = ?, employment_type = ?, salary = ?
       WHERE id = ?`,
      [email, contact_number, address, department_id, employment_type, salary, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ error: 'Failed to update employee' });
  }
});

export default router;
