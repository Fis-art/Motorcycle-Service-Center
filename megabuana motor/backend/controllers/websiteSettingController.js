const pool = require('../config/database');
const { validationResult } = require('express-validator');

exports.getAll = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT setting_key, setting_value FROM website_settings');
    const settings = {};
    for (const row of rows) {
      settings[row.setting_key] = row.setting_value;
    }
    res.json({ success: true, message: 'Settings retrieved', data: settings });
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

    const settings = req.body;
    if (typeof settings !== 'object' || settings === null) {
      return res.status(400).json({ success: false, message: 'Request body must be a key-value object' });
    }

    for (const [key, value] of Object.entries(settings)) {
      await pool.query(
        'INSERT INTO website_settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = ?',
        [key, String(value), String(value)]
      );
    }

    const [rows] = await pool.query('SELECT setting_key, setting_value FROM website_settings');
    const result = {};
    for (const row of rows) {
      result[row.setting_key] = row.setting_value;
    }
    res.json({ success: true, message: 'Settings updated', data: result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
