const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// GET all active products (public) – optional ?promo=1 or ?category=
router.get('/', async (req, res) => {
  try {
    let rows;
    if (req.query.promo === '1') {
      [rows] = await pool.query('SELECT * FROM products WHERE active = TRUE AND promo = TRUE ORDER BY sort_order ASC');
    } else if (req.query.category) {
      [rows] = await pool.query(
        'SELECT * FROM products WHERE active = TRUE AND category = ? ORDER BY sort_order ASC',
        [req.query.category]
      );
    } else {
      [rows] = await pool.query('SELECT * FROM products WHERE active = TRUE ORDER BY sort_order ASC');
    }
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch products' });
  }
});

// GET single product (public)
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Product not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch product' });
  }
});

module.exports = router;
