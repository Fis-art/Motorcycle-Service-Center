const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// GET contact info (public)
router.get('/', async (req, res) => {
  try {
    const [contact] = await pool.query('SELECT * FROM contact_info ORDER BY sort_order ASC');
    const [social] = await pool.query('SELECT * FROM social_media WHERE active = TRUE ORDER BY sort_order ASC');
    const [hours] = await pool.query('SELECT * FROM business_hours ORDER BY sort_order ASC');
    
    res.json({
      contact,
      socialMedia: social,
      businessHours: hours
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch contact info' });
  }
});

// POST contact message (public)
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    
    await pool.query(
      'INSERT INTO contact_messages (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)',
      [name, email, phone, subject, message]
    );
    
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to send message' });
  }
});

module.exports = router;
