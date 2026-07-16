const express = require('express');
const router = express.Router();
const pool = require('../../config/database');

// GET all messages (admin)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 20, unread_only = false } = req.query;
    const offset = (page - 1) * limit;
    
    let whereClause = '';
    if (unread_only === 'true') whereClause = 'WHERE is_read = FALSE';
    
    const [rows] = await pool.query(
      `SELECT * FROM contact_messages ${whereClause} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      [parseInt(limit), parseInt(offset)]
    );
    
    const [count] = await pool.query(`SELECT COUNT(*) as total FROM contact_messages ${whereClause}`);
    
    res.json({
      messages: rows,
      total: count[0].total,
      page: parseInt(page),
      totalPages: Math.ceil(count[0].total / limit)
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch messages' });
  }
});

// PUT mark as read
router.put('/:id/read', async (req, res) => {
  try {
    await pool.query('UPDATE contact_messages SET is_read = TRUE WHERE id = ?', [req.params.id]);
    res.json({ message: 'Message marked as read' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update message' });
  }
});

// PUT mark as unread
router.put('/:id/unread', async (req, res) => {
  try {
    await pool.query('UPDATE contact_messages SET is_read = FALSE WHERE id = ?', [req.params.id]);
    res.json({ message: 'Message marked as unread' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update message' });
  }
});

// DELETE message
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM contact_messages WHERE id = ?', [req.params.id]);
    res.json({ message: 'Message deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete message' });
  }
});

module.exports = router;