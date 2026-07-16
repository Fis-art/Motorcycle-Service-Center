const express = require('express');
const router = express.Router();
const pool = require('../../config/database');

// GET all business hours (admin)
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM business_hours ORDER BY sort_order ASC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch business hours' });
  }
});

// POST create business hour
router.post('/', async (req, res) => {
  try {
    const { day, open_time, close_time, is_closed, sort_order } = req.body;
    
    const [result] = await pool.query(
      'INSERT INTO business_hours (day, open_time, close_time, is_closed, sort_order) VALUES (?, ?, ?, ?, ?)',
      [day, open_time, close_time, is_closed === 'true', sort_order || 0]
    );
    
    const [rows] = await pool.query('SELECT * FROM business_hours WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create business hour' });
  }
});

// PUT update business hour
router.put('/:id', async (req, res) => {
  try {
    const { day, open_time, close_time, is_closed, sort_order } = req.body;
    
    await pool.query(
      'UPDATE business_hours SET day = ?, open_time = ?, close_time = ?, is_closed = ?, sort_order = ? WHERE id = ?',
      [day, open_time, close_time, is_closed === 'true', sort_order || 0, req.params.id]
    );
    
    const [rows] = await pool.query('SELECT * FROM business_hours WHERE id = ?', [req.params.id]);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update business hour' });
  }
});

// DELETE business hour
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM business_hours WHERE id = ?', [req.params.id]);
    res.json({ message: 'Business hour deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete business hour' });
  }
});

// PUT reorder business hours
router.put('/reorder', async (req, res) => {
  try {
    const { orders } = req.body;
    for (const item of orders) {
      await pool.query('UPDATE business_hours SET sort_order = ? WHERE id = ?', [item.sort_order, item.id]);
    }
    res.json({ message: 'Order updated' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to reorder' });
  }
});

module.exports = router;