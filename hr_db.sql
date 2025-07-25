CREATE DATABASE moderntech_hr_db;
USE moderntech_hr_db;

-- Create roles Table
CREATE TABLE roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  role_name VARCHAR(50) NOT NULL UNIQUE
);

-- inserting values into roles table
INSERT INTO roles (role_name) 
VALUES ('HR Manager'),
       ('HR Staff'),
       ('Employee');

       

-- Create users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role_id INT NOT NULL,
  FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);

-- Insert values into user table
INSERT INTO users (username, email, password_hash, role_id)
VALUES
('khanya.hrmanager', 'khanya@moderntech.com', '$2a$10$UnvWYoVwP5X1AG0PdWYeVujURidc9Yt/jfVxOw5fZCZf6KnLYUnfq', 1),
('avelile.hrstaff', 'avelile@moderntech.com', '$2a$10$SVi3HnTnL6WVC6NsRVHIGuVrdsE/8ZQJ7nAOBNtkNPm1Lx8bx.xNa', 2),
('yusra.hrstaff', 'yusra@moderntech.com', '$2a$10$SoCznbmuHoxMGCIg9L/2u.VkRvdAQZVO3G0VRoSdS0dM3aH8S/RfK', 2),
('sipho.employee', 'sipho@moderntech.com', '$2a$10$F8oCwNcM/yIBtRtVjMzeNOnfMvxuIIN1pJhZqIkYKDDO0XiWgcXKm', 3),
('nandi.employee', 'nandi@moderntech.com', '$2a$10$sM1ekCKL8p1r6NmpZV/te.lVyR4zLZUm32U5fPY6s6quZhvXsp3Qy', 3);



-- Create departments table
CREATE TABLE departments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT
);

-- Insert values into departments table
INSERT INTO departments (name, description)
VALUES
('Human Resources', 'Handles recruitment, employee welfare, and HR operations'),
('Finance', 'Manages budgeting, payroll, and financial reporting'),
('Engineering', 'Develops and maintains software systems'),
('Operations', 'Oversees logistics, service delivery, and internal workflows'),
('Customer Support', 'Handles queries, complaints, and service feedback');



-- Create employees table
CREATE TABLE employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  dob DATE,
  contact_number VARCHAR(20),
  email VARCHAR(100) UNIQUE,
  address TEXT,
  department_id INT,
  user_id INT,
  date_joined DATE,
  employment_type VARCHAR(50),
  FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Insert values into employees table
INSERT INTO employees (
  full_name, dob, contact_number, email, address, department_id, user_id, date_joined, employment_type
)
VALUES
('Khanya Haman', '1999-06-23', '0712345678', 'khanya@moderntech.com', 'Cape Town', 1, 1, '2023-08-01', 'Full-Time'),
('Avelile Nkosi', '1996-02-14', '0734567890', 'avelile@moderntech.com', 'Durban', 1, 2, '2024-01-12', 'Full-Time'),
('Yusra Moosa', '1995-11-30', '0726789012', 'yusra@moderntech.com', 'Johannesburg', 1, 3, '2024-03-05', 'Contract'),
('Sipho Dlamini', '2000-08-22', '0747890123', 'sipho@moderntech.com', 'Pretoria', 3, 4, '2024-06-18', 'Part-Time'),
('Nandi Mthembu', '1998-05-07', '0758901234', 'nandi@moderntech.com', 'East London', 5, 5, '2024-07-01', 'Full-Time');

-- Create payroll table
CREATE TABLE payroll (
  id INT AUTO_INCREMENT PRIMARY KEY,
  employee_id INT NOT NULL,
  base_salary DECIMAL(10,2) NOT NULL,
  bonuses DECIMAL(10,2) DEFAULT 0,
  deductions DECIMAL(10,2) DEFAULT 0,
  final_salary DECIMAL(10,2) AS (base_salary + bonuses - deductions) STORED,
  month_year VARCHAR(7) NOT NULL, -- Format: 'YYYY-MM'
  paid_on DATE,
  FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
);

-- Inserting values into payroll table
INSERT INTO payroll (
  employee_id, base_salary, bonuses, deductions, month_year, paid_on
)
VALUES
(1, 32000.00, 2500.00, 1200.00, '2025-07', '2025-07-28'),  -- Khanya
(2, 28000.00, 1500.00, 1000.00, '2025-07', '2025-07-28'),  -- Avelile
(3, 26000.00, 800.00, 500.00, '2025-07', '2025-07-28'),    -- Yusra
(4, 18000.00, 500.00, 400.00, '2025-07', '2025-07-28'),    -- Sipho
(5, 22000.00, 1000.00, 700.00, '2025-07', '2025-07-28');   -- Nandi


-- Create leave request table
CREATE TABLE leave_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  employee_id INT NOT NULL,
  leave_type VARCHAR(50) NOT NULL,           
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status VARCHAR(20) DEFAULT 'Pending',       
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  reviewed_by INT,                            
  FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
);

-- Insert values into leave requests table
INSERT INTO leave_requests (
  employee_id, leave_type, start_date, end_date, status, reviewed_by
)
VALUES
(1, 'Annual Leave', '2025-08-01', '2025-08-05', 'Approved', 2),
(2, 'Sick Leave', '2025-07-18', '2025-07-20', 'Pending', NULL),
(3, 'Study Leave', '2025-09-10', '2025-09-15', 'Rejected', 1),
(4, 'Annual Leave', '2025-07-28', '2025-08-02', 'Approved', 2),
(5, 'Family Responsibility', '2025-08-15', '2025-08-16', 'Pending', NULL);

