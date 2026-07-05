const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectWithRetry, pool } = require('./db');
const recommendationsRouter = require('./routes/recommendations');
const risquesRouter = require('./routes/risques');
const adminRouter = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('/api/images', express.static(path.join(__dirname, 'ressources')));
app.use('/api/images', express.static('/app/uploads'));

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/recommendations', recommendationsRouter);
app.use('/api/risques', risquesRouter);
app.use('/api/admin', adminRouter);

async function runMigrations() {
  // ── 1. Schema: add criticite to any existing table that predates it ──────
  await pool.query(`
    ALTER TABLE risques_notes
      ADD COLUMN IF NOT EXISTS criticite VARCHAR(20) NOT NULL DEFAULT 'Faible'
  `);

  // ── 2. Seed risques_notes (80 rows spread over last 5 months) ───────────
  //    Runs on first start whether the DB was just created via init.sql
  //    or already existed without data.
  await pool.query(`
    DO $$
    DECLARE
      i        INT;
      villes   TEXT[] := ARRAY['Tunis','Sousse','Sfax','Gabès','Bizerte',
                               'Nabeul','Monastir','Kairouan','Gafsa','Béja'];
      sols     TEXT[] := ARRAY['Argile molle','Sable fin','Grave',
                               'Limon argileux','Argile plastique','Sable grossier',
                               'Roche altérée','Remblai compacté','Alluvions','Tourbe'];
      methodes TEXT[] := ARRAY['Pieux Forés','Pieux CFA (Continuous Flight Auger)',
                               'Pieux battus métalliques','Parois moulées',
                               'Jet grouting','Pieux hélicoïdaux'];
      niveaux  TEXT[] := ARRAY['Élevé','Élevé','Moyen','Moyen','Moyen',
                               'Moyen','Faible','Faible','Faible','Très faible'];
      rdate    DATE;
    BEGIN
      IF (SELECT COUNT(*) FROM risques_notes) < 5 THEN
        FOR i IN 1..80 LOOP
          rdate := (NOW() - interval '5 months')::DATE
                   + (floor(random() * 150))::INT;
          INSERT INTO risques_notes
            (gouvernorat, type_sol, methode, profondeur, nappe,
             criticite, recommandation, author, created_at)
          VALUES (
            villes  [1 + (floor(random() * array_length(villes,  1)))::INT],
            sols    [1 + (floor(random() * array_length(sols,    1)))::INT],
            methodes[1 + (floor(random() * array_length(methodes,1)))::INT],
            (5  + random() * 20)::NUMERIC(8,2),
            (1  + random() * 10)::NUMERIC(8,2),
            niveaux [1 + (floor(random() * array_length(niveaux, 1)))::INT],
            'Voir recommandations techniques associées.',
            'wajdimnari@gmail.com',
            rdate
          );
        END LOOP;
        RAISE NOTICE 'Seeded 80 risques_notes';
      END IF;
    END $$;
  `);

  // ── 3. Seed recommendations (frequency counts for admin dashboard) ────────
  await pool.query(`
    DO $$
    DECLARE i INT;
    BEGIN
      IF (SELECT COUNT(*) FROM recommendations) < 5 THEN
        FOR i IN 1..50 LOOP
          INSERT INTO recommendations (risk_id, risk_name, content, author) VALUES
            ('R001','Instabilité du forage','Recommandation technique #'||i,'Technicien');
        END LOOP;
        FOR i IN 1..38 LOOP
          INSERT INTO recommendations (risk_id, risk_name, content, author) VALUES
            ('R002','Déviation du pieu','Recommandation technique #'||i,'Technicien');
        END LOOP;
        FOR i IN 1..24 LOOP
          INSERT INTO recommendations (risk_id, risk_name, content, author) VALUES
            ('R003','Remontée du béton','Recommandation technique #'||i,'Technicien');
        END LOOP;
        FOR i IN 1..14 LOOP
          INSERT INTO recommendations (risk_id, risk_name, content, author) VALUES
            ('R004','Rupture d''outil','Recommandation technique #'||i,'Technicien');
        END LOOP;
        FOR i IN 1..10 LOOP
          INSERT INTO recommendations (risk_id, risk_name, content, author) VALUES
            ('R005','Présence d''obstacle','Recommandation technique #'||i,'Technicien');
        END LOOP;
        FOR i IN 1..6 LOOP
          INSERT INTO recommendations (risk_id, risk_name, content, author) VALUES
            ('R006','Instabilité du fond de fouille','Recommandation technique #'||i,'Technicien');
        END LOOP;
        RAISE NOTICE 'Seeded recommendations';
      END IF;
    END $$;
  `);

  console.log('✓ Migrations and seeds complete');
}

connectWithRetry()
  .then(() => runMigrations())
  .then(() => {
    app.listen(PORT, () => console.log(`Backend listening on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Startup error:', err.message);
    process.exit(1);
  });
