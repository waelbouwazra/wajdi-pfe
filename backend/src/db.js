const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function connectWithRetry(retries = 15, delayMs = 2000) {
  for (let i = 1; i <= retries; i++) {
    try {
      const client = await pool.connect();
      client.release();
      console.log('✓ Database connected');
      return;
    } catch (err) {
      console.log(`DB attempt ${i}/${retries} failed: ${err.message}`);
      if (i === retries) throw err;
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }
}

module.exports = { pool, connectWithRetry };
