const pool = require('../config/database');
const { validationResult } = require('express-validator');

exports.getAll = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM galleries ORDER BY created_at DESC');
    res.json({ success: true, message: 'Galleries retrieved', data: rows, count: rows.length });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getActive = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM galleries WHERE active = true ORDER BY created_at DESC');
    res.json({ success: true, message: 'Active galleries retrieved', data: rows, count: rows.length });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const [rows] = await pool.query('SELECT * FROM galleries WHERE active = true AND category = ? ORDER BY created_at DESC', [category]);
    res.json({ success: true, message: 'Galleries by category retrieved', data: rows, count: rows.length });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM galleries WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Gallery not found' });
    }
    res.json({ success: true, message: 'Gallery retrieved', data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array()[0].msg });
    }

    const { title, description, image, category, active } = req.body;
    const [result] = await pool.query(
      'INSERT INTO galleries (title, description, image, category, active) VALUES (?, ?, ?, ?, ?)',
      [title || null, description || null, image, category || null, active !== undefined ? active : true]
    );

    const [rows] = await pool.query('SELECT * FROM galleries WHERE id = ?', [result.insertId]);
    res.status(201).json({ success: true, message: 'Gallery created', data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array()[0].msg });
    }

    const { title, description, image, category, active } = req.body;
    const [existing] = await pool.query('SELECT * FROM galleries WHERE id = ?', [req.params.id]);
    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: 'Gallery not found' });
    }

    await pool.query(
      'UPDATE galleries SET title = ?, description = ?, image = ?, category = ?, active = ? WHERE id = ?',
      [
        title !== undefined ? title : existing[0].title,
        description !== undefined ? description : existing[0].description,
        image !== undefined ? image : existing[0].image,
        category !== undefined ? category : existing[0].category,
        active !== undefined ? active : existing[0].active,
        req.params.id
      ]
    );

    const [rows] = await pool.query('SELECT * FROM galleries WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Gallery updated', data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const [existing] = await pool.query('SELECT * FROM galleries WHERE id = ?', [req.params.id]);
    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: 'Gallery not found' });
    }
    await pool.query('DELETE FROM galleries WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Gallery deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
