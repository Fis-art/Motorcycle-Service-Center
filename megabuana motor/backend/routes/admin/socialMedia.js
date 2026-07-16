const express = require('express');
const router = express.Router();
const pool = require('../../config/database');
const upload = require('../../middleware/upload');

// GET all social media (admin)
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM social_media ORDER BY sort_order ASC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch social media' });
  }
});

// POST create social media
router.post('/', upload.single('icon'), async (req, res) => {
  try {
    const { platform, url, icon, active, sort_order } = req.body;
    
    const [result] = await pool.query(
      'INSERT INTO social_media (platform, url, icon, active, sort_order) VALUES (?, ?, ?, ?, ?)',
      [platform, url, icon, active === 'true', sort_order || 0]
    );
    
    const [rows] = await pool.query('SELECT * FROM social_media WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create social media' });
  }
});

// PUT update social media
router.put('/:id', upload.single('icon'), async (req, res) => {
  try {
    const { platform, url, icon, active, sort_order } = req.body;
    const icon_file = req.file ? `/uploads/${req.file.filename}` : req.body.existing_icon;
    
    await pool.query(
      'UPDATE social_media SET platform = ?, url = ?, icon = ?, active = ?, sort_order = ? WHERE id = ?',
      [platform, url, icon_file, active === 'true', sort_order || 0, req.params.id]
    );
    
    const [rows] = await pool.query('SELECT * FROM social_media WHERE id = ?', [req.params.id]);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update social media' });
  }
});

// DELETE social media
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM social_media WHERE id = ?', [req.params.id]);
    res.json({ message: 'Social media deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete social media' });
  }
});

// PUT reorder social media
router.put('/reorder', async (req, res) => {
  try {
    const { orders } = req.body;
    for (const item of orders) {
      await pool.query('UPDATE social_media SET sort_order = ? WHERE id = ?', [item.sort_order, item.id]);
    }
    res.json({ message: 'Order updated' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to reorder' });
  }
});

module.exports = router;