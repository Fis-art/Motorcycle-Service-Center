const express = require('express');
const router = express.Router();
const pool = require('../../config/database');
const upload = require('../../middleware/upload');

// GET all hero slides (admin)
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM hero_slides ORDER BY sort_order ASC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch hero slides' });
  }
});

// POST create hero slide
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, subtitle, cta_text, cta_link, active, sort_order } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;
    
    const [result] = await pool.query(
      'INSERT INTO hero_slides (title, subtitle, image, cta_text, cta_link, active, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, subtitle, image, cta_text, cta_link, active === 'true', sort_order || 0]
    );
    
    const [rows] = await pool.query('SELECT * FROM hero_slides WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create hero slide' });
  }
});

// PUT update hero slide
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, subtitle, cta_text, cta_link, active, sort_order } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : req.body.existing_image;
    
    await pool.query(
      'UPDATE hero_slides SET title = ?, subtitle = ?, image = ?, cta_text = ?, cta_link = ?, active = ?, sort_order = ? WHERE id = ?',
      [title, subtitle, image, cta_text, cta_link, active === 'true', sort_order || 0, req.params.id]
    );
    
    const [rows] = await pool.query('SELECT * FROM hero_slides WHERE id = ?', [req.params.id]);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update hero slide' });
  }
});

// DELETE hero slide
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM hero_slides WHERE id = ?', [req.params.id]);
    res.json({ message: 'Hero slide deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete hero slide' });
  }
});

// PUT reorder hero slides
router.put('/reorder', async (req, res) => {
  try {
    const { orders } = req.body;
    for (const item of orders) {
      await pool.query('UPDATE hero_slides SET sort_order = ? WHERE id = ?', [item.sort_order, item.id]);
    }
    res.json({ message: 'Order updated' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to reorder' });
  }
});

module.exports = router;
