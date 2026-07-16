const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// GET all active services (public)
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM services WHERE active = TRUE ORDER BY sort_order ASC'
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch services' });
  }
});

// GET single service (public)
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM services WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Service not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch service' });
  }
});

module.exports = router;