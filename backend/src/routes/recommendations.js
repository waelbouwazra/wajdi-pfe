const router = require('express').Router();
const { pool } = require('../db');

// GET /api/recommendations/:riskId
router.get('/:riskId', async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM recommendations WHERE risk_id = $1 ORDER BY created_at DESC',
      [req.params.riskId]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// POST /api/recommendations
router.post('/', async (req, res) => {
  const { risk_id, risk_name, content, author } = req.body;

  if (!risk_id || !content || !content.trim()) {
    return res.status(400).json({ error: 'risk_id et content sont requis' });
  }

  try {
    const { rows } = await pool.query(
      `INSERT INTO recommendations (risk_id, risk_name, content, author)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [risk_id, risk_name || '', content.trim(), (author || '').trim() || 'Anonyme']
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// DELETE /api/recommendations/:id
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM recommendations WHERE id = $1', [req.params.id]);
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
