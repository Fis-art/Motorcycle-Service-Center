const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// GET about content (public)
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM about_sections WHERE active = TRUE LIMIT 1');
    res.json(rows[0] || {});
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch about content' });
  }
});

module.exports = router;