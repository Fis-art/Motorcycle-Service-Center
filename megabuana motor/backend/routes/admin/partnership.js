const express = require('express');
const router = express.Router();
const pool = require('../../config/database');
const upload = require('../../middleware/upload');

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM partnerships ORDER BY sort_order ASC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch partnerships' });
  }
});

router.post('/', upload.single('logo'), async (req, res) => {
  try {
    const { name, url, active, sort_order } = req.body;
    const logo = req.file ? `/uploads/${req.file.filename}` : null;
    const [result] = await pool.query(
      'INSERT INTO partnerships (name, logo, url, active, sort_order) VALUES (?, ?, ?, ?, ?)',
      [name, logo, url, active === 'true', sort_order || 0]
    );
    const [rows] = await pool.query('SELECT * FROM partnerships WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create partnership' });
  }
});

router.put('/:id', upload.single('logo'), async (req, res) => {
  try {
    const { name, url, active, sort_order } = req.body;
    const logo = req.file ? `/uploads/${req.file.filename}` : req.body.existing_logo;
    await pool.query(
      'UPDATE partnerships SET name = ?, logo = ?, url = ?, active = ?, sort_order = ? WHERE id = ?',
      [name, logo, url, active === 'true', sort_order || 0, req.params.id]
    );
    const [rows] = await pool.query('SELECT * FROM partnerships WHERE id = ?', [req.params.id]);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update partnership' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM partnerships WHERE id = ?', [req.params.id]);
    res.json({ message: 'Partnership deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete partnership' });
  }
});

module.exports = router;
