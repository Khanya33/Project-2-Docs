// backend/routes/leave.js — ES Module setup
import express from 'express';
import {
  getAllLeaveRequests,
  getLeaveRequestById,
  createLeaveRequest,
  updateLeaveStatus,
  deleteLeaveRequest
} from '../controllers/leaveController.js';



// Avelile
//backend/routes/leaveRoutes.js

// import { updateLeaveStatus } from '../controllers/leaveController.js';
const router = express.Router();
// router.get('/', getAllLeaveRequests);
router.put('/:id', updateLeaveStatus);





// 🔹 GET all leave requests
router.get('/', getAllLeaveRequests);

// 🔹 GET specific leave request by ID
router.get('/:id', getLeaveRequestById);

// 🔹 POST a new leave request
router.post('/', createLeaveRequest);

// 🔹 PUT to approve/decline/update status
router.put('/:id', updateLeaveStatus);

// 🔹 DELETE a leave request
router.delete('/:id', deleteLeaveRequest);

export default router;
