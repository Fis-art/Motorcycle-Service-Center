const pool = require('../config/database');
const { validationResult } = require('express-validator');

exports.getAll = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM services ORDER BY sort_order ASC');
    res.json({ success: true, message: 'Services retrieved', data: rows, count: rows.length });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getActive = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM services WHERE active = true ORDER BY sort_order ASC');
    res.json({ success: true, message: 'Active services retrieved', data: rows, count: rows.length });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM services WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    res.json({ success: true, message: 'Service retrieved', data: rows[0] });
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

    const { title, description, icon, image, features, sort_order, active } = req.body;
    const [result] = await pool.query(
      'INSERT INTO services (title, description, icon, image, features, sort_order, active) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, description, icon || null, image || null, features ? JSON.stringify(features) : null, sort_order || 0, active !== undefined ? active : true]
    );

    const [rows] = await pool.query('SELECT * FROM services WHERE id = ?', [result.insertId]);
    res.status(201).json({ success: true, message: 'Service created', data: rows[0] });
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

    const { title, description, icon, image, features, sort_order, active } = req.body;
    const [existing] = await pool.query('SELECT * FROM services WHERE id = ?', [req.params.id]);
    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }

    await pool.query(
      'UPDATE services SET title = ?, description = ?, icon = ?, image = ?, features = ?, sort_order = ?, active = ? WHERE id = ?',
      [
        title || existing[0].title,
        description || existing[0].description,
        icon !== undefined ? icon : existing[0].icon,
        image !== undefined ? image : existing[0].image,
        features !== undefined ? JSON.stringify(features) : existing[0].features,
        sort_order !== undefined ? sort_order : existing[0].sort_order,
        active !== undefined ? active : existing[0].active,
        req.params.id
      ]
    );

    const [rows] = await pool.query('SELECT * FROM services WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Service updated', data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const [existing] = await pool.query('SELECT * FROM services WHERE id = ?', [req.params.id]);
    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    await pool.query('DELETE FROM services WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Service deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateSort = async (req, res) => {
  try {
    const { items } = req.body;
    if (!Array.isArray(items)) {
      return res.status(400).json({ success: false, message: 'items must be an array of {id, sort_order}' });
    }

    for (const item of items) {
      await pool.query('UPDATE services SET sort_order = ? WHERE id = ?', [item.sort_order, item.id]);
    }

    const [rows] = await pool.query('SELECT * FROM services ORDER BY sort_order ASC');
    res.json({ success: true, message: 'Sort order updated', data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
