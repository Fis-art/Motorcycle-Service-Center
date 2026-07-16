const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// GET all hero slides (public)
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM hero_slides WHERE active = TRUE ORDER BY sort_order ASC'
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch hero slides' });
  }
});

module.exports = router;