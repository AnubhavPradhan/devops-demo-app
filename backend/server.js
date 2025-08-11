import express from 'express';
import cors from 'cors';

const PORT = process.env.PORT || 4000;
const app = express();
app.use(cors({ origin: '*' }));

app.get('/api/hello', (_req, res) => {
  res.json({ message: 'Hello from backend', time: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Backend listening on http://0.0.0.0:${PORT}`);
});
