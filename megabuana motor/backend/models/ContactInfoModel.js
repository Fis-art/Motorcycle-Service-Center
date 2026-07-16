const pool = require('../config/database');

const ContactInfoModel = {
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM contact_info ORDER BY sort_order ASC');
    return rows;
  },

  async getActive() {
    const [rows] = await pool.query('SELECT * FROM contact_info ORDER BY sort_order ASC');
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query('SELECT * FROM contact_info WHERE id = ?', [id]);
    return rows[0] || null;
  },

  async create(data) {
    const { type, label, value, icon, sort_order } = data;
    const [result] = await pool.query(
      'INSERT INTO contact_info (type, label, value, icon, sort_order) VALUES (?, ?, ?, ?, ?)',
      [type, label || null, value, icon || null, sort_order || 0]
    );
    return result.insertId;
  },

  async update(id, data) {
    const fields = [];
    const values = [];
    for (const key of ['type', 'label', 'value', 'icon', 'sort_order']) {
      if (data[key] !== undefined) {
        fields.push(`${key} = ?`);
        values.push(data[key]);
      }
    }
    if (fields.length === 0) return false;
    values.push(id);
    const [result] = await pool.query(`UPDATE contact_info SET ${fields.join(', ')} WHERE id = ?`, values);
    return result.affectedRows > 0;
  },

  async delete(id) {
    const [result] = await pool.query('DELETE FROM contact_info WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = ContactInfoModel;
