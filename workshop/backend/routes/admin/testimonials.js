const express = require('express');
const router = express.Router();
const pool = require('../../config/database');
const upload = require('../../middleware/upload');

// GET all testimonials (admin)
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM testimonials ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch testimonials' });
  }
});

// POST create testimonial
router.post('/', upload.single('avatar'), async (req, res) => {
  try {
    const { client_name, client_role, content, rating, active } = req.body;
    const avatar = req.file ? `/uploads/${req.file.filename}` : null;
    
    const [result] = await pool.query(
      'INSERT INTO testimonials (client_name, client_role, content, avatar, rating, active) VALUES (?, ?, ?, ?, ?, ?)',
      [client_name, client_role, content, avatar, rating || 5, active === 'true']
    );
    
    const [rows] = await pool.query('SELECT * FROM testimonials WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create testimonial' });
  }
});

// PUT update testimonial
router.put('/:id', upload.single('avatar'), async (req, res) => {
  try {
    const { client_name, client_role, content, rating, active } = req.body;
    const avatar = req.file ? `/uploads/${req.file.filename}` : req.body.existing_avatar;
    
    await pool.query(
      'UPDATE testimonials SET client_name = ?, client_role = ?, content = ?, avatar = ?, rating = ?, active = ? WHERE id = ?',
      [client_name, client_role, content, avatar, rating || 5, active === 'true', req.params.id]
    );
    
    const [rows] = await pool.query('SELECT * FROM testimonials WHERE id = ?', [req.params.id]);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update testimonial' });
  }
});

// DELETE testimonial
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM testimonials WHERE id = ?', [req.params.id]);
    res.json({ message: 'Testimonial deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete testimonial' });
  }
});

module.exports = router;
