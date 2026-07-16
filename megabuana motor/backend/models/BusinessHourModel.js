const pool = require('../config/database');

const BusinessHourModel = {
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM business_hours ORDER BY sort_order ASC');
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query('SELECT * FROM business_hours WHERE id = ?', [id]);
    return rows[0] || null;
  },

  async create(data) {
    const { day, open_time, close_time, is_closed, sort_order } = data;
    const [result] = await pool.query(
      'INSERT INTO business_hours (day, open_time, close_time, is_closed, sort_order) VALUES (?, ?, ?, ?, ?)',
      [day, open_time || null, close_time || null, is_closed !== undefined ? is_closed : false, sort_order || 0]
    );
    return result.insertId;
  },

  async update(id, data) {
    const fields = [];
    const values = [];
    for (const key of ['day', 'open_time', 'close_time', 'is_closed', 'sort_order']) {
      if (data[key] !== undefined) {
        fields.push(`${key} = ?`);
        values.push(data[key]);
      }
    }
    if (fields.length === 0) return false;
    values.push(id);
    const [result] = await pool.query(`UPDATE business_hours SET ${fields.join(', ')} WHERE id = ?`, values);
    return result.affectedRows > 0;
  },

  async delete(id) {
    const [result] = await pool.query('DELETE FROM business_hours WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = BusinessHourModel;
