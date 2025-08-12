import express from 'express';
import cors from 'cors';

// Load environment variables
const PORT = process.env.PORT || 4000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

const app = express();

// Middleware
app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json()); // Parse JSON request bodies

// Health check route
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Main API route
app.get('/api/hello', (_req, res) => {
  res.json({ 
    message: 'Hello from backend', 
    time: new Date().toISOString() 
  });
});

// Catch-all route for undefined endpoints
app.use((_req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Backend listening on http://0.0.0.0:${PORT}`);
});
