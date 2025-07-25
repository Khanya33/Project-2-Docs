// Khanya's code 

import db from '../config/db.js';

export const getAllLeaveRequests = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM leave_requests');
    res.status(200).json(rows);
  } catch (err) {
    console.error('Leave fetch error:', err);
    res.status(500).json({ message: 'Failed to fetch leave requests' });
  }
};

export const getLeaveRequestById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM leave_requests WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Request not found' });
    res.status(200).json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving leave request' });
  }
};

export const createLeaveRequest = async (req, res) => {
  const { employee_id, start_date, end_date, reason } = req.body;
  try {
    await db.query(
      'INSERT INTO leave_requests (employee_id, start_date, end_date, reason, status) VALUES (?, ?, ?, ?, ?)',
      [employee_id, start_date, end_date, reason, 'pending']
    );
    res.status(201).json({ message: 'Leave request submitted' });
  } catch (err) {
    res.status(500).json({ message: 'Error submitting leave request' });
  }
};

export const updateLeaveRequestStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // "approved", "declined", etc.

  try {
    const [result] = await db.query(
      'UPDATE leave_requests SET status = ? WHERE id = ?',
      [status, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Request not found' });
    res.status(200).json({ message: `Leave request ${status}` });
  } catch (err) {
    res.status(500).json({ message: 'Error updating request status' });
  }
};

export const deleteLeaveRequest = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM leave_requests WHERE id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Request not found' });
    res.status(200).json({ message: 'Leave request deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting leave request' });
  }
};