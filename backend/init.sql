-- ─── Tables ───────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS recommendations (
  id          SERIAL PRIMARY KEY,
  risk_id     VARCHAR(10)  NOT NULL,
  risk_name   VARCHAR(255) NOT NULL DEFAULT '',
  content     TEXT         NOT NULL,
  author      VARCHAR(255) NOT NULL DEFAULT 'Anonyme',
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_recommendations_risk_id ON recommendations(risk_id);

CREATE TABLE IF NOT EXISTS risques_notes (
  id             SERIAL PRIMARY KEY,
  type_sol       VARCHAR(100),
  methode        VARCHAR(100),
  profondeur     NUMERIC(8,2),
  nappe          NUMERIC(8,2),
  diametre       NUMERIC(8,2),
  environnement  VARCHAR(200),
  gouvernorat    VARCHAR(100) NOT NULL,
  recommandation TEXT,
  photo_url      VARCHAR(500),
  author         VARCHAR(255) NOT NULL DEFAULT 'Anonyme',
  criticite      VARCHAR(20)  NOT NULL DEFAULT 'Faible',
  created_at     TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_risques_notes_gouvernorat ON risques_notes(gouvernorat);
CREATE INDEX IF NOT EXISTS idx_risques_notes_created_at  ON risques_notes(created_at);
CREATE INDEX IF NOT EXISTS idx_risques_notes_criticite   ON risques_notes(criticite);

-- ─── Seed: risques_notes ─────────────────────────────────────────────────────
-- 80 random entries spread over the last 6 months, seeded only on fresh DB.
DO $$
DECLARE
  i         INT;
  villes    TEXT[] := ARRAY['Tunis','Sousse','Sfax','Gabès','Bizerte','Nabeul','Monastir','Kairouan','Gafsa','Béja'];
  sols      TEXT[] := ARRAY['Argile molle','Sable fin','Grave','Limon argileux','Argile plastique','Sable grossier','Roche altérée','Remblai compacté','Alluvions','Tourbe'];
  methodes  TEXT[] := ARRAY['Pieux Forés','Pieux CFA (Continuous Flight Auger)','Pieux battus métalliques','Parois moulées','Jet grouting','Pieux hélicoïdaux'];
  niveaux   TEXT[] := ARRAY['Élevé','Élevé','Moyen','Moyen','Moyen','Moyen','Faible','Faible','Faible','Très faible'];
  rand_date DATE;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM risques_notes LIMIT 1) THEN
    FOR i IN 1..80 LOOP
      rand_date := (NOW() - interval '5 months')::DATE + (floor(random() * 150))::INT;
      INSERT INTO risques_notes
        (gouvernorat, type_sol, methode, profondeur, nappe, criticite, recommandation, author, created_at)
      VALUES (
        villes [1 + (floor(random() * array_length(villes,  1)))::INT],
        sols   [1 + (floor(random() * array_length(sols,    1)))::INT],
        methodes[1 + (floor(random() * array_length(methodes,1)))::INT],
        (5  + random() * 20)::NUMERIC(8,2),
        (1  + random() * 10)::NUMERIC(8,2),
        niveaux[1 + (floor(random() * array_length(niveaux, 1)))::INT],
        'Voir recommandations techniques associées.',
        'wajdimnari@gmail.com',
        rand_date
      );
    END LOOP;
  END IF;
END $$;

-- ─── Seed: recommendations ───────────────────────────────────────────────────
-- Multiple entries per risk name so the "risques les plus fréquents" widget
-- shows meaningful frequency counts on a fresh database.
DO $$
DECLARE i INT;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM recommendations LIMIT 1) THEN
    FOR i IN 1..50 LOOP
      INSERT INTO recommendations (risk_id, risk_name, content, author)
      VALUES ('R001','Effondrement des parois',
              'Vérifier la stabilité des parois. Recommandation #' || i, 'Technicien');
    END LOOP;
    FOR i IN 1..38 LOOP
      INSERT INTO recommendations (risk_id, risk_name, content, author)
      VALUES ('R002','Déviation du pieu',
              'Contrôler la verticalité toutes les 3 passes. Recommandation #' || i, 'Technicien');
    END LOOP;
    FOR i IN 1..24 LOOP
      INSERT INTO recommendations (risk_id, risk_name, content, author)
      VALUES ('R003','Remontée du béton',
              'Ajuster le débit de bétonnage. Recommandation #' || i, 'Technicien');
    END LOOP;
    FOR i IN 1..14 LOOP
      INSERT INTO recommendations (risk_id, risk_name, content, author)
      VALUES ('R004','Rupture d''outil',
              'Inspecter l''outil avant chaque opération. Recommandation #' || i, 'Technicien');
    END LOOP;
    FOR i IN 1..10 LOOP
      INSERT INTO recommendations (risk_id, risk_name, content, author)
      VALUES ('R005','Présence d''obstacle',
              'Effectuer un sondage complémentaire. Recommandation #' || i, 'Technicien');
    END LOOP;
    FOR i IN 1..6 LOOP
      INSERT INTO recommendations (risk_id, risk_name, content, author)
      VALUES ('R006','Instabilité du fond de fouille',
              'Renforcer le fond avant coffrage. Recommandation #' || i, 'Technicien');
    END LOOP;
  END IF;
END $$;
