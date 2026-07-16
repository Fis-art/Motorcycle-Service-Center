const pool = require('../config/database');

const HeroModel = {
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM hero_slides ORDER BY sort_order ASC');
    return rows;
  },

  async getActive() {
    const [rows] = await pool.query('SELECT * FROM hero_slides WHERE active = TRUE ORDER BY sort_order ASC');
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query('SELECT * FROM hero_slides WHERE id = ?', [id]);
    return rows[0] || null;
  },

  async create(data) {
    const { title, subtitle, image, cta_text, cta_link, active, sort_order } = data;
    const [result] = await pool.query(
      'INSERT INTO hero_slides (title, subtitle, image, cta_text, cta_link, active, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, subtitle || null, image, cta_text || null, cta_link || null, active !== undefined ? active : true, sort_order || 0]
    );
    return result.insertId;
  },

  async update(id, data) {
    const fields = [];
    const values = [];
    for (const key of ['title', 'subtitle', 'image', 'cta_text', 'cta_link', 'active', 'sort_order']) {
      if (data[key] !== undefined) {
        fields.push(`${key} = ?`);
        values.push(data[key]);
      }
    }
    if (fields.length === 0) return false;
    values.push(id);
    const [result] = await pool.query(`UPDATE hero_slides SET ${fields.join(', ')} WHERE id = ?`, values);
    return result.affectedRows > 0;
  },

  async delete(id) {
    const [result] = await pool.query('DELETE FROM hero_slides WHERE id = ?', [id]);
    return result.affectedRows > 0;
  },

  async updateSort(id, sort_order) {
    const [result] = await pool.query('UPDATE hero_slides SET sort_order = ? WHERE id = ?', [sort_order, id]);
    return result.affectedRows > 0;
  }
};

module.exports = HeroModel;
