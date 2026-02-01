# Journal App

A full-stack application with React frontend and Express/MySQL backend.

## Quick Start

### 1. Install Dependencies

```bash
npm run install:all
```

### 2. Set Up MySQL Database

Create the database and tables:

```bash
mysql -u root -p < server/schema.sql
```

### 3. Configure Environment

Copy the example env file and update with your MySQL credentials:

```bash
cp server/.env.example server/.env
```

Edit `server/.env` with your database credentials.

### 4. Start Both Frontend and Backend

```bash
npm run dev
```

This single command starts:
- **Frontend**: React app on http://localhost:3000
- **Backend**: Express API on http://localhost:5000

## Project Structure

```
journal-v1/
├── client/          # React frontend (Vite)
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   └── vite.config.js
├── server/          # Express backend
│   ├── index.js
│   ├── schema.sql
│   └── .env.example
└── package.json     # Root package with concurrent scripts
```

## Available Scripts

- `npm run dev` - Start both frontend and backend
- `npm run client` - Start frontend only
- `npm run server` - Start backend only
- `npm run build` - Build frontend for production

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/entries` - Get all entries
- `POST /api/entries` - Create new entry
