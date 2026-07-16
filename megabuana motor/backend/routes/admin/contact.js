const express = require('express');
const router = express.Router();
const pool = require('../../config/database');

// GET all contact info (admin)
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM contact_info ORDER BY sort_order ASC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch contact info' });
  }
});

// POST create contact info entry
router.post('/', async (req, res) => {
  try {
    const { type, label, value, icon, sort_order } = req.body;
    
    const [result] = await pool.query(
      'INSERT INTO contact_info (type, label, value, icon, sort_order) VALUES (?, ?, ?, ?, ?)',
      [type, label, value, icon, sort_order || 0]
    );
    
    const [rows] = await pool.query('SELECT * FROM contact_info WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create contact info' });
  }
});

// PUT update contact info entry
router.put('/:id', async (req, res) => {
  try {
    const { type, label, value, icon, sort_order } = req.body;
    
    await pool.query(
      'UPDATE contact_info SET type = ?, label = ?, value = ?, icon = ?, sort_order = ? WHERE id = ?',
      [type, label, value, icon, sort_order || 0, req.params.id]
    );
    
    const [rows] = await pool.query('SELECT * FROM contact_info WHERE id = ?', [req.params.id]);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update contact info' });
  }
});

// DELETE contact info entry
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM contact_info WHERE id = ?', [req.params.id]);
    res.json({ message: 'Contact info deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete contact info' });
  }
});

module.exports = router;
