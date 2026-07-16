const pool = require('../config/database');

const TestimonialModel = {
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM testimonials ORDER BY created_at DESC');
    return rows;
  },

  async getActive() {
    const [rows] = await pool.query('SELECT * FROM testimonials WHERE active = TRUE ORDER BY rating DESC, created_at DESC');
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query('SELECT * FROM testimonials WHERE id = ?', [id]);
    return rows[0] || null;
  },

  async create(data) {
    const { client_name, client_role, content, avatar, rating, active } = data;
    const [result] = await pool.query(
      'INSERT INTO testimonials (client_name, client_role, content, avatar, rating, active) VALUES (?, ?, ?, ?, ?, ?)',
      [client_name, client_role || null, content, avatar || null, rating || 5, active !== undefined ? active : true]
    );
    return result.insertId;
  },

  async update(id, data) {
    const fields = [];
    const values = [];
    for (const key of ['client_name', 'client_role', 'content', 'avatar', 'rating', 'active']) {
      if (data[key] !== undefined) {
        fields.push(`${key} = ?`);
        values.push(data[key]);
      }
    }
    if (fields.length === 0) return false;
    values.push(id);
    const [result] = await pool.query(`UPDATE testimonials SET ${fields.join(', ')} WHERE id = ?`, values);
    return result.affectedRows > 0;
  },

  async delete(id) {
    const [result] = await pool.query('DELETE FROM testimonials WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = TestimonialModel;
