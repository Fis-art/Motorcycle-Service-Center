const express = require('express');
const router = express.Router();
const pool = require('../../config/database');
const upload = require('../../middleware/upload');

// GET about content (admin)
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM about_sections ORDER BY id DESC LIMIT 1');
    res.json(rows[0] || {});
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch about content' });
  }
});

// PUT update about content
router.put('/', upload.single('image'), async (req, res) => {
  try {
    const { title, subtitle, description, vision, mission, active } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : req.body.existing_image;
    
    const [existing] = await pool.query('SELECT id FROM about_sections ORDER BY id DESC LIMIT 1');
    
    if (existing.length > 0) {
      await pool.query(
        'UPDATE about_sections SET title = ?, subtitle = ?, description = ?, vision = ?, mission = ?, image = ?, active = ? WHERE id = ?',
        [title, subtitle, description, vision, mission, image, active === 'true', existing[0].id]
      );
    } else {
      await pool.query(
        'INSERT INTO about_sections (title, subtitle, description, vision, mission, image, active) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [title, subtitle, description, vision, mission, image, active === 'true']
      );
    }
    
    const [rows] = await pool.query('SELECT * FROM about_sections ORDER BY id DESC LIMIT 1');
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update about content' });
  }
});

module.exports = router;
