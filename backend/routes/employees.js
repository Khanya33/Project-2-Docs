//Khanya's code
import express from 'express';
import {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee
} from '../controllers/employeeController.js';

const router = express.Router();

// GET all employees
router.get('/', getAllEmployees);

// GET employee by ID
router.get('/:id', getEmployeeById);

// POST new employee
router.post('/', createEmployee);

// PUT update employee
router.put('/:id', updateEmployee);

// DELETE employee
router.delete('/:id', deleteEmployee);

export default router;