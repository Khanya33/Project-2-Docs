import express from 'express';
import db from '../config/db.js';

const router = express.Router();

// GET all performance reviews
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT pr.id,
             emp.full_name AS employee_name,
             rev.full_name AS reviewer_name,
             pr.review_date,
             pr.rating,
             pr.comments,
             pr.strengths,
             pr.areas_for_improvement
      FROM performance_reviews pr
      JOIN employees emp ON pr.employee_id = emp.id
      JOIN employees rev ON pr.reviewer_id = rev.id
      ORDER BY pr.review_date DESC
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// POST a new performance review
router.post('/', async (req, res) => {
  try {
    const {
      employeeName,
      reviewer,
      date,
      rating,
      comments,
      strengths,
      improvementAreas
    } = req.body;

    console.log('Incoming data:', req.body);

    // Validate required fields
    if (!employeeName || !reviewer || !date || rating === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Lookup employee and reviewer IDs
    const [employeeRows] = await db.execute(
      'SELECT id FROM employees WHERE full_name = ?',
      [employeeName]
    );
    const [reviewerRows] = await db.execute(
      'SELECT id FROM employees WHERE full_name = ?',
      [reviewer]
    );

    if (employeeRows.length === 0 || reviewerRows.length === 0) {
      return res.status(400).json({ error: 'Employee or reviewer not found' });
    }

    const employeeId = employeeRows[0].id;
    const reviewerId = reviewerRows[0].id;

    // Insert the review
    const [result] = await db.execute(
      `INSERT INTO performance_reviews 
        (employee_id, reviewer_id, review_date, rating, comments, strengths, areas_for_improvement) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        employeeId,
        reviewerId,
        date,
        rating,
        comments || '',
        JSON.stringify(strengths || []),
        JSON.stringify(improvementAreas || [])
      ]
    );

    // Return the full new review (joined with employee/reviewer names)
    const [newReviewRows] = await db.execute(
      `SELECT pr.id,
              emp.full_name AS employee_name,
              rev.full_name AS reviewer_name,
              pr.review_date,
              pr.rating,
              pr.comments,
              pr.strengths,
              pr.areas_for_improvement
       FROM performance_reviews pr
       JOIN employees emp ON pr.employee_id = emp.id
       JOIN employees rev ON pr.reviewer_id = rev.id
       WHERE pr.id = ?`,
      [result.insertId]
    );

    res.status(201).json(newReviewRows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save review' });
  }
});

export default router;
