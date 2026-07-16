const pool = require('../config/database');

const ServiceModel = {
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM services ORDER BY sort_order ASC');
    return rows;
  },

  async getActive() {
    const [rows] = await pool.query('SELECT * FROM services WHERE active = TRUE ORDER BY sort_order ASC');
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query('SELECT * FROM services WHERE id = ?', [id]);
    return rows[0] || null;
  },

  async create(data) {
    const { title, description, icon, image, features, sort_order, active } = data;
    const [result] = await pool.query(
      'INSERT INTO services (title, description, icon, image, features, sort_order, active) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, description, icon || null, image || null, features ? JSON.stringify(features) : null, sort_order || 0, active !== undefined ? active : true]
    );
    return result.insertId;
  },

  async update(id, data) {
    const fields = [];
    const values = [];
    for (const key of ['title', 'description', 'icon', 'image', 'features', 'sort_order', 'active']) {
      if (data[key] !== undefined) {
        fields.push(`${key} = ?`);
        values.push(key === 'features' ? JSON.stringify(data[key]) : data[key]);
      }
    }
    if (fields.length === 0) return false;
    values.push(id);
    const [result] = await pool.query(`UPDATE services SET ${fields.join(', ')} WHERE id = ?`, values);
    return result.affectedRows > 0;
  },

  async delete(id) {
    const [result] = await pool.query('DELETE FROM services WHERE id = ?', [id]);
    return result.affectedRows > 0;
  },

  async updateSort(id, sort_order) {
    const [result] = await pool.query('UPDATE services SET sort_order = ? WHERE id = ?', [sort_order, id]);
    return result.affectedRows > 0;
  }
};

module.exports = ServiceModel;
