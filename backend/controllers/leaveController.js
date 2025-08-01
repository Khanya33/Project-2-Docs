//Avelile
// backend/controllers/leaveController.js
import  pool from '../config/db.js';
// :large_blue_diamond: GET all leave requests (with employee + reviewer info)
export const getAllLeaveRequests = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        lr.id,
        e.full_name AS employee_name,
        lr.leave_type,
        lr.start_date,
        lr.end_date,
        lr.reason,
        lr.status,
        lr.submitted_at,
        u.username AS reviewed_by
      FROM leave_requests lr
      JOIN employees e ON lr.employee_id = e.id
      LEFT JOIN users u ON lr.reviewed_by = u.id;
    `);
    const mappedLeaves = rows.map(req => ({
      id: req.id,
      employee: req.employee_name,
      type: req.leave_type,
      start: req.start_date,
      end: req.end_date,
      reason: req.reason,
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
// :large_blue_diamond: GET a single leave request by ID
export const getLeaveRequestById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM leave_requests WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Request not found' });
    }
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error('Error retrieving leave request:', err);
    res.status(500).json({ message: 'Error retrieving leave request' });
  }
};
// :large_blue_diamond: CREATE a new leave request
export const createLeaveRequest = async (req, res) => {
  const { employee_id, start_date, end_date, reason, leave_type } = req.body;
  try {
    await pool.query(
      `INSERT INTO leave_requests (employee_id, start_date, end_date, reason, leave_type, status)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [employee_id, start_date, end_date, reason, leave_type, 'pending']
    );
    res.status(201).json({ message: 'Leave request submitted' });
  } catch (err) {
    console.error('Error submitting leave request:', err);
    res.status(500).json({ message: 'Error submitting leave request' });
  }
};
// :large_blue_diamond: UPDATE leave request status
export const updateLeaveStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const [result] = await pool.query(
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
// :large_blue_diamond: DELETE a leave request
export const deleteLeaveRequest = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM leave_requests WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Request not found' });
    }
    res.status(200).json({ message: 'Leave request deleted' });
  } catch (err) {
    console.error('Error deleting leave request:', err);
    res.status(500).json({ message: 'Error deleting leave request' });
  }
};

