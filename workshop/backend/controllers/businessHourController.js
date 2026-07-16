const pool = require('../config/database');
const { validationResult } = require('express-validator');

exports.getAll = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM business_hours ORDER BY sort_order ASC');
    res.json({ success: true, message: 'Business hours retrieved', data: rows, count: rows.length });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM business_hours WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Business hour not found' });
    }
    res.json({ success: true, message: 'Business hour retrieved', data: rows[0] });
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

    const { day, open_time, close_time, is_closed, sort_order } = req.body;
    const [result] = await pool.query(
      'INSERT INTO business_hours (day, open_time, close_time, is_closed, sort_order) VALUES (?, ?, ?, ?, ?)',
      [day, open_time || null, close_time || null, is_closed || false, sort_order || 0]
    );

    const [rows] = await pool.query('SELECT * FROM business_hours WHERE id = ?', [result.insertId]);
    res.status(201).json({ success: true, message: 'Business hour created', data: rows[0] });
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

    const { day, open_time, close_time, is_closed, sort_order } = req.body;
    const [existing] = await pool.query('SELECT * FROM business_hours WHERE id = ?', [req.params.id]);
    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: 'Business hour not found' });
    }

    await pool.query(
      'UPDATE business_hours SET day = ?, open_time = ?, close_time = ?, is_closed = ?, sort_order = ? WHERE id = ?',
      [
        day || existing[0].day,
        open_time !== undefined ? open_time : existing[0].open_time,
        close_time !== undefined ? close_time : existing[0].close_time,
        is_closed !== undefined ? is_closed : existing[0].is_closed,
        sort_order !== undefined ? sort_order : existing[0].sort_order,
        req.params.id
      ]
    );

    const [rows] = await pool.query('SELECT * FROM business_hours WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Business hour updated', data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const [existing] = await pool.query('SELECT * FROM business_hours WHERE id = ?', [req.params.id]);
    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: 'Business hour not found' });
    }
    await pool.query('DELETE FROM business_hours WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Business hour deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
