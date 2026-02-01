import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mysql from 'mysql2/promise'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 6001

// Middleware
app.use(cors())
app.use(express.json())

// Database connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'journal_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    const connection = await pool.getConnection()
    connection.release()
    res.json({ message: 'Server is running and database is connected!' })
  } catch (error) {
    res.json({ message: 'Server is running but database is not connected' })
  }
})

// Example API endpoint
app.get('/api/entries', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM entries ORDER BY created_at DESC')
    res.json(rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post('/api/entries', async (req, res) => {
  const { title, content } = req.body
  try {
    const [result] = await pool.query(
      'INSERT INTO entries (title, content) VALUES (?, ?)',
      [title, content]
    )
    res.json({ id: result.insertId, title, content })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
