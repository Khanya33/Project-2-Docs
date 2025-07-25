// Khanya's code

import express from 'express';
import {
  getAllPayroll,
  getPayrollById,
  createPayrollEntry,
  updatePayrollEntry,
  deletePayrollEntry
} from '../controllers/payrollController.js';

const router = express.Router();

// GET all payroll records
router.get('/', getAllPayroll);

// GET payroll by ID
router.get('/:id', getPayrollById);

// POST new payroll record
router.post('/', createPayrollEntry);

// PUT update record
router.put('/:id', updatePayrollEntry);

// DELETE record
router.delete('/:id', deletePayrollEntry);

export default router;