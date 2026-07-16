const pool = require('../config/database');

const ContactMessageModel = {
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM contact_messages ORDER BY created_at DESC');
    return rows;
  },

  async getUnread() {
    const [rows] = await pool.query('SELECT * FROM contact_messages WHERE is_read = FALSE ORDER BY created_at DESC');
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query('SELECT * FROM contact_messages WHERE id = ?', [id]);
    return rows[0] || null;
  },

  async create(data) {
    const { name, email, phone, subject, message } = data;
    const [result] = await pool.query(
      'INSERT INTO contact_messages (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)',
      [name, email, phone || null, subject || null, message]
    );
    return result.insertId;
  },

  async markAsRead(id) {
    const [result] = await pool.query('UPDATE contact_messages SET is_read = TRUE WHERE id = ?', [id]);
    return result.affectedRows > 0;
  },

  async delete(id) {
    const [result] = await pool.query('DELETE FROM contact_messages WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = ContactMessageModel;
