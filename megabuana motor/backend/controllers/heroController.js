const pool = require('../config/database');
const { validationResult } = require('express-validator');

exports.getAll = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM hero_slides ORDER BY sort_order ASC');
    res.json({ success: true, message: 'Hero slides retrieved', data: rows, count: rows.length });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getActive = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM hero_slides WHERE active = true ORDER BY sort_order ASC');
    res.json({ success: true, message: 'Active hero slides retrieved', data: rows, count: rows.length });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM hero_slides WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Hero slide not found' });
    }
    res.json({ success: true, message: 'Hero slide retrieved', data: rows[0] });
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

    const { title, subtitle, image, cta_text, cta_link, active, sort_order } = req.body;
    const [result] = await pool.query(
      'INSERT INTO hero_slides (title, subtitle, image, cta_text, cta_link, active, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, subtitle || null, image || null, cta_text || null, cta_link || null, active !== undefined ? active : true, sort_order || 0]
    );

    const [rows] = await pool.query('SELECT * FROM hero_slides WHERE id = ?', [result.insertId]);
    res.status(201).json({ success: true, message: 'Hero slide created', data: rows[0] });
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

    const { title, subtitle, image, cta_text, cta_link, active, sort_order } = req.body;
    const [existing] = await pool.query('SELECT * FROM hero_slides WHERE id = ?', [req.params.id]);
    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: 'Hero slide not found' });
    }

    await pool.query(
      'UPDATE hero_slides SET title = ?, subtitle = ?, image = ?, cta_text = ?, cta_link = ?, active = ?, sort_order = ? WHERE id = ?',
      [
        title || existing[0].title,
        subtitle !== undefined ? subtitle : existing[0].subtitle,
        image !== undefined ? image : existing[0].image,
        cta_text !== undefined ? cta_text : existing[0].cta_text,
        cta_link !== undefined ? cta_link : existing[0].cta_link,
        active !== undefined ? active : existing[0].active,
        sort_order !== undefined ? sort_order : existing[0].sort_order,
        req.params.id
      ]
    );

    const [rows] = await pool.query('SELECT * FROM hero_slides WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Hero slide updated', data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const [existing] = await pool.query('SELECT * FROM hero_slides WHERE id = ?', [req.params.id]);
    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: 'Hero slide not found' });
    }
    await pool.query('DELETE FROM hero_slides WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Hero slide deleted' });
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
      await pool.query('UPDATE hero_slides SET sort_order = ? WHERE id = ?', [item.sort_order, item.id]);
    }

    const [rows] = await pool.query('SELECT * FROM hero_slides ORDER BY sort_order ASC');
    res.json({ success: true, message: 'Sort order updated', data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
