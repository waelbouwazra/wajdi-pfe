const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectWithRetry } = require('./db');
const recommendationsRouter = require('./routes/recommendations');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('/api/images', express.static(path.join(__dirname, 'ressources')));

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/recommendations', recommendationsRouter);

connectWithRetry()
  .then(() => {
    app.listen(PORT, () => console.log(`Backend listening on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Failed to connect to database:', err.message);
    process.exit(1);
  });
