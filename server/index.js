import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import Database from 'better-sqlite3'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 6001

// Middleware
app.use(cors())
app.use(express.json())

// Database setup
const db = new Database('journal.db')

// Initialize database schema
db.exec(`
  CREATE TABLE IF NOT EXISTS entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`)

// Health check endpoint
app.get('/api/health', (req, res) => {
  try {
    db.prepare('SELECT 1').get()
    res.json({ message: 'Server is running and database is connected!' })
  } catch (error) {
    res.json({ message: 'Server is running but database is not connected' })
  }
})

// Get all entries
app.get('/api/entries', (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM entries ORDER BY created_at DESC').all()
    res.json(rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create new entry
app.post('/api/entries', (req, res) => {
  const { title, content } = req.body
  try {
    const stmt = db.prepare('INSERT INTO entries (title, content) VALUES (?, ?)')
    const result = stmt.run(title, content)
    res.json({ id: result.lastInsertRowid, title, content })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
