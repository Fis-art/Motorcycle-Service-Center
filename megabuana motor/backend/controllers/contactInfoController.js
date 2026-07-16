const pool = require('../config/database');
const { validationResult } = require('express-validator');

exports.getAll = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM contact_info ORDER BY sort_order ASC');
    res.json({ success: true, message: 'Contact info retrieved', data: rows, count: rows.length });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getActive = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM contact_info ORDER BY sort_order ASC');
    res.json({ success: true, message: 'Contact info retrieved', data: rows, count: rows.length });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM contact_info WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Contact info not found' });
    }
    res.json({ success: true, message: 'Contact info retrieved', data: rows[0] });
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

    const { type, label, value, icon, sort_order } = req.body;
    const [result] = await pool.query(
      'INSERT INTO contact_info (type, label, value, icon, sort_order) VALUES (?, ?, ?, ?, ?)',
      [type, label || null, value, icon || null, sort_order || 0]
    );

    const [rows] = await pool.query('SELECT * FROM contact_info WHERE id = ?', [result.insertId]);
    res.status(201).json({ success: true, message: 'Contact info created', data: rows[0] });
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

    const { type, label, value, icon, sort_order } = req.body;
    const [existing] = await pool.query('SELECT * FROM contact_info WHERE id = ?', [req.params.id]);
    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: 'Contact info not found' });
    }

    await pool.query(
      'UPDATE contact_info SET type = ?, label = ?, value = ?, icon = ?, sort_order = ? WHERE id = ?',
      [
        type || existing[0].type,
        label !== undefined ? label : existing[0].label,
        value || existing[0].value,
        icon !== undefined ? icon : existing[0].icon,
        sort_order !== undefined ? sort_order : existing[0].sort_order,
        req.params.id
      ]
    );

    const [rows] = await pool.query('SELECT * FROM contact_info WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Contact info updated', data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const [existing] = await pool.query('SELECT * FROM contact_info WHERE id = ?', [req.params.id]);
    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: 'Contact info not found' });
    }
    await pool.query('DELETE FROM contact_info WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Contact info deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
