const pool = require('../config/database');

const WebsiteSettingModel = {
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM website_settings');
    return rows;
  },

  async getByKey(key) {
    const [rows] = await pool.query('SELECT * FROM website_settings WHERE setting_key = ?', [key]);
    return rows[0] || null;
  },

  async updateByKey(key, value) {
    const [existing] = await pool.query('SELECT id FROM website_settings WHERE setting_key = ?', [key]);
    if (existing.length > 0) {
      const [result] = await pool.query('UPDATE website_settings SET setting_value = ? WHERE setting_key = ?', [value, key]);
      return result.affectedRows > 0;
    }
    const [result] = await pool.query('INSERT INTO website_settings (setting_key, setting_value) VALUES (?, ?)', [key, value]);
    return result.insertId > 0;
  }
};

module.exports = WebsiteSettingModel;
