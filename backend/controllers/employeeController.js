// Khanya's code

import db from '../config/db.js';

export const getAllEmployees = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM employees');
    res.status(200).json(rows);
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({ message: 'Failed to fetch employees' });
  }
};

export const getEmployeeById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM employees WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Employee not found' });
    res.status(200).json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving employee' });
  }
};

export const createEmployee = async (req, res) => {
  const { name, email, department, role_id } = req.body;
  try {
    await db.query(
      'INSERT INTO employees (name, email, department, role_id) VALUES (?, ?, ?, ?)',
      [name, email, department, role_id]
    );
    res.status(201).json({ message: 'Employee created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error creating employee' });
  }
};

export const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, email, department, role_id } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE employees SET name = ?, email = ?, department = ?, role_id = ? WHERE id = ?',
      [name, email, department, role_id, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Employee not found' });
    res.status(200).json({ message: 'Employee updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating employee' });
  }
};

export const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM employees WHERE id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Employee not found' });
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting employee' });
  }
};