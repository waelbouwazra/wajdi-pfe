const router = require('express').Router();
const { pool } = require('../db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = '/app/uploads';
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `risque_${Date.now()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: (_req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp|gif/;
    const ok =
      allowed.test(path.extname(file.originalname).toLowerCase()) &&
      allowed.test(file.mimetype);
    ok ? cb(null, true) : cb(new Error('Seules les images sont acceptées'));
  },
});

// POST /api/risques
router.post('/', upload.single('photo'), async (req, res) => {
  const {
    type_sol, methode, profondeur, nappe, diametre,
    environnement, gouvernorat, recommandation, author,
  } = req.body;

  if (!gouvernorat || !gouvernorat.trim()) {
    return res.status(400).json({ error: 'Le gouvernorat est requis' });
  }

  const photo_url = req.file ? `/api/images/${req.file.filename}` : null;

  try {
    const { rows } = await pool.query(
      `INSERT INTO risques_notes
         (type_sol, methode, profondeur, nappe, diametre,
          environnement, gouvernorat, recommandation, photo_url, author)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
       RETURNING *`,
      [
        type_sol || null,
        methode || null,
        profondeur ? parseFloat(profondeur) : null,
        nappe      ? parseFloat(nappe)      : null,
        diametre   ? parseFloat(diametre)   : null,
        environnement || null,
        gouvernorat.trim(),
        recommandation || null,
        photo_url,
        (author || '').trim() || 'Anonyme',
      ]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// GET /api/risques
router.get('/', async (_req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM risques_notes ORDER BY created_at DESC'
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
