const express = require('express');
const router = express.Router();
const pool = require('../../config/database');
const upload = require('../../middleware/upload');

// GET all gallery items (admin)
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM galleries ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch gallery' });
  }
});

// POST create gallery item
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, description, category, active } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;
    
    const [result] = await pool.query(
      'INSERT INTO galleries (title, description, image, category, active) VALUES (?, ?, ?, ?, ?)',
      [title, description, image, category, active === 'true']
    );
    
    const [rows] = await pool.query('SELECT * FROM galleries WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create gallery item' });
  }
});

// PUT update gallery item
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, description, category, active } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : req.body.existing_image;
    
    await pool.query(
      'UPDATE galleries SET title = ?, description = ?, image = ?, category = ?, active = ? WHERE id = ?',
      [title, description, image, category, active === 'true', req.params.id]
    );
    
    const [rows] = await pool.query('SELECT * FROM galleries WHERE id = ?', [req.params.id]);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update gallery item' });
  }
});

// DELETE gallery item
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM galleries WHERE id = ?', [req.params.id]);
    res.json({ message: 'Gallery item deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete gallery item' });
  }
});

module.exports = router;
