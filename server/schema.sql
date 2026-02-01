-- Create database
CREATE DATABASE IF NOT EXISTS journal_db;
USE journal_db;

-- Create entries table
CREATE TABLE IF NOT EXISTS entries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO entries (title, content) VALUES
  ('My First Entry', 'This is my first journal entry!'),
  ('Another Day', 'Today was a great day.');
