// backend/routes/leave.js — ES Module setup
import express from 'express';
import {
  getAllLeaveRequests,
  getLeaveRequestById,
  createLeaveRequest,
  updateLeaveRequestStatus,
  deleteLeaveRequest
} from '../controllers/leaveController.js';

const router = express.Router();

// 🔹 GET all leave requests
router.get('/', getAllLeaveRequests);

// 🔹 GET specific leave request by ID
router.get('/:id', getLeaveRequestById);

// 🔹 POST a new leave request
router.post('/', createLeaveRequest);

// 🔹 PUT to approve/decline/update status
router.put('/:id', updateLeaveRequestStatus);

// 🔹 DELETE a leave request
router.delete('/:id', deleteLeaveRequest);

export default router;
