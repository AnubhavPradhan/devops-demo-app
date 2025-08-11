import { useEffect, useState } from 'react'

export default function App() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'
    fetch(`${API_URL}/api/hello`)
      .then(r => r.json())
      .then(setData)
      .catch(e => setError(e.message))
  }, [])

  return (
    <div style={{ fontFamily: 'system-ui', padding: 24, lineHeight: 1.5 }}>
      <h1>Frontend and Backend (Demo-App)</h1>
      <p>
        This is a simple frontend that fetches data from a backend API.
        The backend is running on <code>http://localhost:4000/api/hello</code>
      </p>
      <p>
        This frontend calls <code>/api/hello</code> on the backend using
        <code> - VITE_API_URL</code>.
      </p>
      {error && (<p><b>Error:</b> {error}</p>)}
      <pre style={{ background: '#f7f7f7', padding: 12, borderRadius: 8 }}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  )
}
