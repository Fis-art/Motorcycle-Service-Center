const pool = require('../config/database');
const { validationResult } = require('express-validator');

exports.getAll = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM social_media ORDER BY sort_order ASC');
    res.json({ success: true, message: 'Social media retrieved', data: rows, count: rows.length });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getActive = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM social_media WHERE active = true ORDER BY sort_order ASC');
    res.json({ success: true, message: 'Active social media retrieved', data: rows, count: rows.length });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM social_media WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Social media not found' });
    }
    res.json({ success: true, message: 'Social media retrieved', data: rows[0] });
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

    const { platform, url, icon, active, sort_order } = req.body;
    const [result] = await pool.query(
      'INSERT INTO social_media (platform, url, icon, active, sort_order) VALUES (?, ?, ?, ?, ?)',
      [platform, url, icon || null, active !== undefined ? active : true, sort_order || 0]
    );

    const [rows] = await pool.query('SELECT * FROM social_media WHERE id = ?', [result.insertId]);
    res.status(201).json({ success: true, message: 'Social media created', data: rows[0] });
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

    const { platform, url, icon, active, sort_order } = req.body;
    const [existing] = await pool.query('SELECT * FROM social_media WHERE id = ?', [req.params.id]);
    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: 'Social media not found' });
    }

    await pool.query(
      'UPDATE social_media SET platform = ?, url = ?, icon = ?, active = ?, sort_order = ? WHERE id = ?',
      [
        platform || existing[0].platform,
        url || existing[0].url,
        icon !== undefined ? icon : existing[0].icon,
        active !== undefined ? active : existing[0].active,
        sort_order !== undefined ? sort_order : existing[0].sort_order,
        req.params.id
      ]
    );

    const [rows] = await pool.query('SELECT * FROM social_media WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Social media updated', data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const [existing] = await pool.query('SELECT * FROM social_media WHERE id = ?', [req.params.id]);
    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: 'Social media not found' });
    }
    await pool.query('DELETE FROM social_media WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Social media deleted' });
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
      await pool.query('UPDATE social_media SET sort_order = ? WHERE id = ?', [item.sort_order, item.id]);
    }

    const [rows] = await pool.query('SELECT * FROM social_media ORDER BY sort_order ASC');
    res.json({ success: true, message: 'Sort order updated', data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
