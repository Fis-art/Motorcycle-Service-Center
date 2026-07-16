const pool = require('../config/database');
const { validationResult } = require('express-validator');

exports.getAll = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM testimonials ORDER BY created_at DESC');
    res.json({ success: true, message: 'Testimonials retrieved', data: rows, count: rows.length });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getActive = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM testimonials WHERE active = true ORDER BY rating DESC, created_at DESC');
    res.json({ success: true, message: 'Active testimonials retrieved', data: rows, count: rows.length });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM testimonials WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }
    res.json({ success: true, message: 'Testimonial retrieved', data: rows[0] });
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

    const { client_name, client_role, content, avatar, rating, active } = req.body;
    const [result] = await pool.query(
      'INSERT INTO testimonials (client_name, client_role, content, avatar, rating, active) VALUES (?, ?, ?, ?, ?, ?)',
      [client_name, client_role || null, content, avatar || null, rating || 5, active !== undefined ? active : true]
    );

    const [rows] = await pool.query('SELECT * FROM testimonials WHERE id = ?', [result.insertId]);
    res.status(201).json({ success: true, message: 'Testimonial created', data: rows[0] });
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

    const { client_name, client_role, content, avatar, rating, active } = req.body;
    const [existing] = await pool.query('SELECT * FROM testimonials WHERE id = ?', [req.params.id]);
    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }

    await pool.query(
      'UPDATE testimonials SET client_name = ?, client_role = ?, content = ?, avatar = ?, rating = ?, active = ? WHERE id = ?',
      [
        client_name || existing[0].client_name,
        client_role !== undefined ? client_role : existing[0].client_role,
        content || existing[0].content,
        avatar !== undefined ? avatar : existing[0].avatar,
        rating !== undefined ? rating : existing[0].rating,
        active !== undefined ? active : existing[0].active,
        req.params.id
      ]
    );

    const [rows] = await pool.query('SELECT * FROM testimonials WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Testimonial updated', data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const [existing] = await pool.query('SELECT * FROM testimonials WHERE id = ?', [req.params.id]);
    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }
    await pool.query('DELETE FROM testimonials WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Testimonial deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
