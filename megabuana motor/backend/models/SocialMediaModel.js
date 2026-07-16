const pool = require('../config/database');

const SocialMediaModel = {
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM social_media ORDER BY sort_order ASC');
    return rows;
  },

  async getActive() {
    const [rows] = await pool.query('SELECT * FROM social_media WHERE active = TRUE ORDER BY sort_order ASC');
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query('SELECT * FROM social_media WHERE id = ?', [id]);
    return rows[0] || null;
  },

  async create(data) {
    const { platform, url, icon, active, sort_order } = data;
    const [result] = await pool.query(
      'INSERT INTO social_media (platform, url, icon, active, sort_order) VALUES (?, ?, ?, ?, ?)',
      [platform, url, icon || null, active !== undefined ? active : true, sort_order || 0]
    );
    return result.insertId;
  },

  async update(id, data) {
    const fields = [];
    const values = [];
    for (const key of ['platform', 'url', 'icon', 'active', 'sort_order']) {
      if (data[key] !== undefined) {
        fields.push(`${key} = ?`);
        values.push(data[key]);
      }
    }
    if (fields.length === 0) return false;
    values.push(id);
    const [result] = await pool.query(`UPDATE social_media SET ${fields.join(', ')} WHERE id = ?`, values);
    return result.affectedRows > 0;
  },

  async delete(id) {
    const [result] = await pool.query('DELETE FROM social_media WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = SocialMediaModel;
