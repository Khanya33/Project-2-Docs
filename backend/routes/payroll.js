import express from 'express';
import { getAllPayroll } from '../controllers/payrollController.js';

const router = express.Router();
router.get('/', getAllPayroll);

export default router;
