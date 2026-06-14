const router = require('express').Router();
const { pool } = require('../db');

const FR_MONTHS = ['Jan','Fév','Mar','Avr','Mai','Juin','Juil','Août','Sep','Oct','Nov','Déc'];

/* GET /api/admin/stats
   Returns 4 KPI cards: analyses, projets, risques détectés, risques élevés
   Each with total + growth (entries added this calendar month) */
router.get('/stats', async (_req, res) => {
  try {
    const { rows: [r] } = await pool.query(`
      SELECT
        COUNT(*)::int                                                                              AS analyses,
        COUNT(*) FILTER (WHERE created_at >= date_trunc('month', now()))::int                     AS analyses_growth,
        COUNT(DISTINCT gouvernorat)::int                                                           AS projets,
        COUNT(DISTINCT gouvernorat) FILTER (WHERE created_at >= date_trunc('month', now()))::int  AS projets_growth,
        COUNT(*) FILTER (WHERE criticite = 'Élevé')::int                                          AS risques_eleves,
        COUNT(*) FILTER (WHERE criticite = 'Élevé' AND created_at >= date_trunc('month', now()))::int AS eleves_growth
      FROM risques_notes
    `);

    const { rows: [rec] } = await pool.query(`
      SELECT
        COUNT(*)::int                                                                          AS risques,
        COUNT(*) FILTER (WHERE created_at >= date_trunc('month', now()))::int                 AS risques_growth
      FROM recommendations
    `);

    res.json({
      analyses:        r.analyses,
      analyses_growth: r.analyses_growth,
      projets:         r.projets,
      projets_growth:  r.projets_growth,
      risques:         rec.risques,
      risques_growth:  rec.risques_growth,
      risques_eleves:  r.risques_eleves,
      eleves_growth:   r.eleves_growth,
    });
  } catch (err) {
    console.error('admin/stats', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

/* GET /api/admin/monthly
   Returns last 6 months of risques_notes counts as [{month, count}]
   Months with 0 entries are still returned (LEFT JOIN with series). */
router.get('/monthly', async (_req, res) => {
  try {
    const { rows } = await pool.query(`
      WITH months AS (
        SELECT generate_series(
          date_trunc('month', now() - interval '5 months'),
          date_trunc('month', now()),
          interval '1 month'
        ) AS ms
      ),
      counts AS (
        SELECT date_trunc('month', created_at) AS ms, COUNT(*)::int AS cnt
        FROM risques_notes
        WHERE created_at >= date_trunc('month', now() - interval '5 months')
        GROUP BY 1
      )
      SELECT m.ms, COALESCE(c.cnt, 0) AS count
      FROM months m
      LEFT JOIN counts c USING (ms)
      ORDER BY m.ms
    `);
    res.json(rows.map(r => ({
      month: FR_MONTHS[new Date(r.ms).getUTCMonth()],
      count: r.count,
    })));
  } catch (err) {
    console.error('admin/monthly', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

/* GET /api/admin/distribution
   Returns [{level, count, pct}] for risk criticite breakdown */
router.get('/distribution', async (_req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT
        COALESCE(criticite, 'Faible') AS level,
        COUNT(*)::int AS count
      FROM risques_notes
      GROUP BY criticite
      ORDER BY
        CASE criticite
          WHEN 'Élevé'      THEN 1
          WHEN 'Moyen'      THEN 2
          WHEN 'Faible'     THEN 3
          WHEN 'Très faible' THEN 4
          ELSE 5
        END
    `);
    const total = rows.reduce((s, r) => s + r.count, 0);
    res.json(rows.map(r => ({
      level: r.level,
      count: r.count,
      pct:   total > 0 ? Math.round(r.count * 100 / total) : 0,
    })));
  } catch (err) {
    console.error('admin/distribution', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

/* GET /api/admin/recent
   Returns last 5 risques_notes as recent analyses rows */
router.get('/recent', async (_req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT
        id,
        'PIEU-' || LPAD(id::text, 3, '0')   AS projet,
        gouvernorat,
        COALESCE(criticite, 'Faible')         AS niveau,
        TO_CHAR(created_at, 'DD/MM/YYYY')     AS date
      FROM risques_notes
      ORDER BY created_at DESC
      LIMIT 5
    `);
    res.json(rows);
  } catch (err) {
    console.error('admin/recent', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

/* GET /api/admin/frequent
   Returns top-5 most-discussed risk names from recommendations */
router.get('/frequent', async (_req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT risk_name AS name, COUNT(*)::int AS count
      FROM recommendations
      WHERE risk_name IS NOT NULL AND risk_name <> ''
      GROUP BY risk_name
      ORDER BY count DESC
      LIMIT 5
    `);
    res.json(rows);
  } catch (err) {
    console.error('admin/frequent', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
