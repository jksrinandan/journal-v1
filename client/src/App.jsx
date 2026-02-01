import { useState, useEffect } from 'react'

function App() {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => {
        setMessage(data.message)
        setLoading(false)
      })
      .catch(err => {
        setMessage('Backend not connected')
        setLoading(false)
      })
  }, [])

  return (
    <div className="app">
      <h1>Journal App</h1>
      <div className="status">
        <h2>Backend Status</h2>
        {loading ? <p>Loading...</p> : <p>{message}</p>}
      </div>
    </div>
  )
}

export default App
