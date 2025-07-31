import db from '../config/db.js';

export const getAllPayroll = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        payroll.id AS payroll_id,
        employees.full_name AS employee_name,
        payroll.base_salary,
        payroll.bonuses,
        payroll.deductions,
        payroll.final_salary,
        payroll.month_year,
        payroll.paid_on
      FROM payroll
      JOIN employees ON payroll.employee_id = employees.id;
    `);

    const mappedPayroll = rows.map(row => ({
      id: row.payroll_id,
      employeeName: row.employee_name,
      baseSalary: row.base_salary,
      bonuses: row.bonuses,
      deductions: row.deductions,
      finalSalary: row.final_salary,
      month: row.month_year,
      paidOn: row.paid_on
    }));

    res.json(mappedPayroll);
  } catch (err) {
    console.error('Payroll fetch error:', err);
    res.status(500).json({ message: 'Failed to fetch payroll records' });
  }
};
