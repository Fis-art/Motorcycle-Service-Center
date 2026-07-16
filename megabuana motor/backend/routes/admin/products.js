const express = require('express');
const router = express.Router();
const pool = require('../../config/database');
const upload = require('../../middleware/upload');

// GET all products (admin)
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products ORDER BY sort_order ASC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch products' });
  }
});

// POST create product
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const {
      name, category, brand, description, price, old_price,
      promo, stock, motor_type, active, sort_order,
    } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const [result] = await pool.query(
      `INSERT INTO products
        (name, category, brand, description, image, price, old_price, promo, stock, motor_type, sort_order, active)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name, category || 'sparepart', brand || null, description || null, image,
        price || 0, old_price || null, promo === 'true' || promo === true,
        stock || 0, motor_type || null, sort_order || 0,
        active === 'false' ? false : true,
      ]
    );

    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create product' });
  }
});

// PUT update product
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const {
      name, category, brand, description, price, old_price,
      promo, stock, motor_type, active, sort_order,
    } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : req.body.existing_image;

    await pool.query(
      `UPDATE products SET
        name = ?, category = ?, brand = ?, description = ?, image = ?,
        price = ?, old_price = ?, promo = ?, stock = ?, motor_type = ?, sort_order = ?, active = ?
       WHERE id = ?`,
      [
        name, category, brand, description, image,
        price, old_price || null, promo === 'true' || promo === true,
        stock, motor_type, sort_order, active === 'false' ? false : true, req.params.id,
      ]
    );

    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update product' });
  }
});

// DELETE product
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM products WHERE id = ?', [req.params.id]);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete product' });
  }
});

// PUT reorder products
router.put('/reorder', async (req, res) => {
  try {
    const { orders } = req.body;
    for (const item of orders) {
      await pool.query('UPDATE products SET sort_order = ? WHERE id = ?', [item.sort_order, item.id]);
    }
    res.json({ message: 'Order updated' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to reorder' });
  }
});

module.exports = router;
