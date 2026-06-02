CREATE TABLE IF NOT EXISTS recommendations (
  id          SERIAL PRIMARY KEY,
  risk_id     VARCHAR(10)  NOT NULL,
  risk_name   VARCHAR(255) NOT NULL DEFAULT '',
  content     TEXT         NOT NULL,
  author      VARCHAR(255) NOT NULL DEFAULT 'Anonyme',
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_recommendations_risk_id ON recommendations(risk_id);
