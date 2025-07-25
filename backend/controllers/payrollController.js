// Khanya's code

import db from '../config/db.js';

export const getAllPayroll = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM payroll');
    res.status(200).json(rows);
  } catch (err) {
    console.error('Payroll fetch error:', err);
    res.status(500).json({ message: 'Failed to fetch payroll records' });
  }
};

export const getPayrollById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM payroll WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Payroll record not found' });
    res.status(200).json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving payroll record' });
  }
};

export const createPayrollEntry = async (req, res) => {
  const { employee_id, salary, bonus, deductions, month } = req.body;
  try {
    await db.query(
      'INSERT INTO payroll (employee_id, salary, bonus, deductions, month) VALUES (?, ?, ?, ?, ?)',
      [employee_id, salary, bonus, deductions, month]
    );
    res.status(201).json({ message: 'Payroll record created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error creating payroll record' });
  }
};

export const updatePayrollEntry = async (req, res) => {
  const { id } = req.params;
  const { salary, bonus, deductions, month } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE payroll SET salary = ?, bonus = ?, deductions = ?, month = ? WHERE id = ?',
      [salary, bonus, deductions, month, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Record not found' });
    res.status(200).json({ message: 'Payroll record updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating payroll record' });
  }
};

export const deletePayrollEntry = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM payroll WHERE id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Record not found' });
    res.status(200).json({ message: 'Payroll record deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting payroll record' });
  }
};