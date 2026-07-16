const pool = require('../config/database');

const GalleryModel = {
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM galleries ORDER BY created_at DESC');
    return rows;
  },

  async getActive() {
    const [rows] = await pool.query('SELECT * FROM galleries WHERE active = TRUE ORDER BY created_at DESC');
    return rows;
  },

  async getByCategory(category) {
    const [rows] = await pool.query('SELECT * FROM galleries WHERE category = ? AND active = TRUE ORDER BY created_at DESC', [category]);
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query('SELECT * FROM galleries WHERE id = ?', [id]);
    return rows[0] || null;
  },

  async create(data) {
    const { title, description, image, category, active } = data;
    const [result] = await pool.query(
      'INSERT INTO galleries (title, description, image, category, active) VALUES (?, ?, ?, ?, ?)',
      [title || null, description || null, image, category || null, active !== undefined ? active : true]
    );
    return result.insertId;
  },

  async update(id, data) {
    const fields = [];
    const values = [];
    for (const key of ['title', 'description', 'image', 'category', 'active']) {
      if (data[key] !== undefined) {
        fields.push(`${key} = ?`);
        values.push(data[key]);
      }
    }
    if (fields.length === 0) return false;
    values.push(id);
    const [result] = await pool.query(`UPDATE galleries SET ${fields.join(', ')} WHERE id = ?`, values);
    return result.affectedRows > 0;
  },

  async delete(id) {
    const [result] = await pool.query('DELETE FROM galleries WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = GalleryModel;
