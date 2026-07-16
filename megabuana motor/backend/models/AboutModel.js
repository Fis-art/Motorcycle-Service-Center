const pool = require('../config/database');

const AboutModel = {
  async getActive() {
    const [rows] = await pool.query('SELECT * FROM about_sections WHERE active = TRUE LIMIT 1');
    return rows[0] || null;
  },

  async getById(id) {
    const [rows] = await pool.query('SELECT * FROM about_sections WHERE id = ?', [id]);
    return rows[0] || null;
  },

  async create(data) {
    const { title, subtitle, description, image, vision, mission, active } = data;
    const [result] = await pool.query(
      'INSERT INTO about_sections (title, subtitle, description, image, vision, mission, active) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, subtitle || null, description, image || null, vision || null, mission || null, active !== undefined ? active : true]
    );
    return result.insertId;
  },

  async update(id, data) {
    const fields = [];
    const values = [];
    for (const key of ['title', 'subtitle', 'description', 'image', 'vision', 'mission', 'active']) {
      if (data[key] !== undefined) {
        fields.push(`${key} = ?`);
        values.push(data[key]);
      }
    }
    if (fields.length === 0) return false;
    values.push(id);
    const [result] = await pool.query(`UPDATE about_sections SET ${fields.join(', ')} WHERE id = ?`, values);
    return result.affectedRows > 0;
  }
};

module.exports = AboutModel;
