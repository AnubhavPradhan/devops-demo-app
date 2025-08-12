import { useEffect, useState } from 'react';

export default function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  // Dynamically set API URL:
  // 1. Use env variable if set
  // 2. Otherwise use current host but port 4000 for backend
  const API_URL =
    import.meta.env.VITE_API_URL ||
    `http://${window.location.hostname}:4000`;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${API_URL}/api/hello`);
        if (!res.ok) {
          throw new Error(`HTTP ${res.status} - ${res.statusText}`);
        }
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message || 'Unknown error');
      }
    }

    fetchData();
  }, [API_URL]);

  return (
    <div style={{ fontFamily: 'system-ui', padding: 24, lineHeight: 1.5 }}>
      <h1>Frontend and Backend (Demo-App)</h1>
      <p>
        This is a simple frontend that fetches data from a backend API.
        The backend is running at: <code>{API_URL}/api/hello</code>
      </p>
      <p>
        This frontend calls <code>/api/hello</code> on the backend using
        <code> - VITE_API_URL</code>.
      </p>

      {error && (
        <p style={{ color: 'red' }}>
          <b>Error:</b> {error}
        </p>
      )}

      {data && (
        <pre
          style={{
            background: '#f7f7f7',
            padding: 12,
            borderRadius: 8,
            overflowX: 'auto',
          }}
        >
          {JSON.stringify(data, null, 2)}
        </pre>
      )}

      {!data && !error && <p>Loading...</p>}
    </div>
  );
}
