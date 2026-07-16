const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// GET all active gallery images (public)
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM galleries WHERE active = TRUE ORDER BY created_at DESC'
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch gallery' });
  }
});

module.exports = router;
