// backend/controllers/leaveController.js — ES Module setup
import db from '../config/db.js';

// 🔹 GET all leave requests
export const getAllLeaveRequests = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        employees.full_name AS employee_name,
        leave_requests.leave_type,
        leave_requests.start_date,
        leave_requests.end_date,
        leave_requests.status,
        leave_requests.submitted_at,
        reviewers.username AS reviewed_by
      FROM leave_requests
      JOIN employees ON leave_requests.employee_id = employees.id
      LEFT JOIN users AS reviewers ON leave_requests.reviewed_by = reviewers.id;
    `);
    const mappedLeaves = rows.map(req => ({
      employee: req.employee_name,
      type: req.leave_type,
      start: req.start_date,
      end: req.end_date,
      status: req.status,
      submitted: req.submitted_at,
      reviewedBy: req.reviewed_by ?? '—'
    }));
    res.status(200).json(mappedLeaves);
  } catch (err) {
    console.error('Error fetching leave requests:', err);
    res.status(500).json({ message: 'Failed to fetch leave requests' });
  }
};

// 🔹 GET a single leave request by ID
export const getLeaveRequestById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM leave_requests WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Request not found' });
    }
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error('Error retrieving leave request:', err);
    res.status(500).json({ message: 'Error retrieving leave request' });
  }
};

// 🔹 CREATE a new leave request
export const createLeaveRequest = async (req, res) => {
  const { employee_id, start_date, end_date, reason } = req.body;
  try {
    await db.query(
      'INSERT INTO leave_requests (employee_id, start_date, end_date, reason, status) VALUES (?, ?, ?, ?, ?)',
      [employee_id, start_date, end_date, reason, 'pending']
    );
    res.status(201).json({ message: 'Leave request submitted' });
  } catch (err) {
    console.error('Error submitting leave request:', err);
    res.status(500).json({ message: 'Error submitting leave request' });
  }
};

// 🔹 UPDATE leave request status
export const updateLeaveRequestStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE leave_requests SET status = ? WHERE id = ?',
      [status, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Request not found' });
    }
    res.status(200).json({ message: `Leave request ${status}` });
  } catch (err) {
    console.error('Error updating request status:', err);
    res.status(500).json({ message: 'Error updating request status' });
  }
};

// 🔹 DELETE a leave request
export const deleteLeaveRequest = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM leave_requests WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Request not found' });
    }
    res.status(200).json({ message: 'Leave request deleted' });
  } catch (err) {
    console.error('Error deleting leave request:', err);
    res.status(500).json({ message: 'Error deleting leave request' });
  }
};
