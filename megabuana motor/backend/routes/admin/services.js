const express = require('express');
const router = express.Router();
const pool = require('../../config/database');
const upload = require('../../middleware/upload');

// GET all services (admin)
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM services ORDER BY sort_order ASC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch services' });
  }
});

// POST create service
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, description, icon, features, active, sort_order } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;
    
    const [result] = await pool.query(
      'INSERT INTO services (title, description, icon, image, features, active, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, description, icon, image, features, active === 'true', sort_order || 0]
    );
    
    const [rows] = await pool.query('SELECT * FROM services WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create service' });
  }
});

// PUT update service
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, description, icon, features, active, sort_order } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : req.body.existing_image;
    
    await pool.query(
      'UPDATE services SET title = ?, description = ?, icon = ?, image = ?, features = ?, active = ?, sort_order = ? WHERE id = ?',
      [title, description, icon, image, features, active === 'true', sort_order || 0, req.params.id]
    );
    
    const [rows] = await pool.query('SELECT * FROM services WHERE id = ?', [req.params.id]);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update service' });
  }
});

// DELETE service
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM services WHERE id = ?', [req.params.id]);
    res.json({ message: 'Service deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete service' });
  }
});

// PUT reorder services
router.put('/reorder', async (req, res) => {
  try {
    const { orders } = req.body;
    for (const item of orders) {
      await pool.query('UPDATE services SET sort_order = ? WHERE id = ?', [item.sort_order, item.id]);
    }
    res.json({ message: 'Order updated' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to reorder' });
  }
});

module.exports = router;
