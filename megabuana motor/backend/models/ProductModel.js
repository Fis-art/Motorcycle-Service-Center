const pool = require('../config/database');

const ProductModel = {
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM products ORDER BY sort_order ASC');
    return rows;
  },

  async getActive() {
    const [rows] = await pool.query('SELECT * FROM products WHERE active = TRUE ORDER BY sort_order ASC');
    return rows;
  },

  async getPromo() {
    const [rows] = await pool.query(
      'SELECT * FROM products WHERE active = TRUE AND promo = TRUE ORDER BY sort_order ASC'
    );
    return rows;
  },

  async getByCategory(category) {
    const [rows] = await pool.query(
      'SELECT * FROM products WHERE active = TRUE AND category = ? ORDER BY sort_order ASC',
      [category]
    );
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
    return rows[0] || null;
  },

  async create(data) {
    const {
      name, category, brand, description, image,
      price, old_price, promo, stock, motor_type, sort_order, active,
    } = data;
    const [result] = await pool.query(
      `INSERT INTO products
        (name, category, brand, description, image, price, old_price, promo, stock, motor_type, sort_order, active)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name, category || 'sparepart', brand || null, description || null, image || null,
        price || 0, old_price || null, promo !== undefined ? promo : false,
        stock || 0, motor_type || null, sort_order || 0, active !== undefined ? active : true,
      ]
    );
    return result.insertId;
  },

  async update(id, data) {
    const fields = [];
    const values = [];
    for (const key of [
      'name', 'category', 'brand', 'description', 'image',
      'price', 'old_price', 'promo', 'stock', 'motor_type', 'sort_order', 'active',
    ]) {
      if (data[key] !== undefined) fields.push(`${key} = ?`), values.push(data[key]);
    }
    if (fields.length === 0) return false;
    values.push(id);
    const [result] = await pool.query(`UPDATE products SET ${fields.join(', ')} WHERE id = ?`, values);
    return result.affectedRows > 0;
  },

  async delete(id) {
    const [result] = await pool.query('DELETE FROM products WHERE id = ?', [id]);
    return result.affectedRows > 0;
  },

  async updateSort(id, sort_order) {
    const [result] = await pool.query('UPDATE products SET sort_order = ? WHERE id = ?', [sort_order, id]);
    return result.affectedRows > 0;
  },
};

module.exports = ProductModel;
