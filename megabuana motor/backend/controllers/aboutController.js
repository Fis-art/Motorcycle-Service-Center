const pool = require('../config/database');
const { validationResult } = require('express-validator');

exports.getActive = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM about_sections WHERE active = true LIMIT 1');
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'No active about section found' });
    }
    res.json({ success: true, message: 'About section retrieved', data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM about_sections WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'About section not found' });
    }
    res.json({ success: true, message: 'About section retrieved', data: rows[0] });
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

    const { title, subtitle, description, image, vision, mission, active } = req.body;
    const [result] = await pool.query(
      'INSERT INTO about_sections (title, subtitle, description, image, vision, mission, active) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, subtitle || null, description, image || null, vision || null, mission || null, active !== undefined ? active : true]
    );

    const [rows] = await pool.query('SELECT * FROM about_sections WHERE id = ?', [result.insertId]);
    res.status(201).json({ success: true, message: 'About section created', data: rows[0] });
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

    const { title, subtitle, description, image, vision, mission, active } = req.body;
    const [existing] = await pool.query('SELECT * FROM about_sections WHERE id = ?', [req.params.id]);
    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: 'About section not found' });
    }

    await pool.query(
      'UPDATE about_sections SET title = ?, subtitle = ?, description = ?, image = ?, vision = ?, mission = ?, active = ? WHERE id = ?',
      [
        title || existing[0].title,
        subtitle !== undefined ? subtitle : existing[0].subtitle,
        description || existing[0].description,
        image !== undefined ? image : existing[0].image,
        vision !== undefined ? vision : existing[0].vision,
        mission !== undefined ? mission : existing[0].mission,
        active !== undefined ? active : existing[0].active,
        req.params.id
      ]
    );

    const [rows] = await pool.query('SELECT * FROM about_sections WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'About section updated', data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
