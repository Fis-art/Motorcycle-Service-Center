const express = require('express');
const router = express.Router();

// Public routes
router.use('/hero', require('./hero'));
router.use('/about', require('./about'));
router.use('/services', require('./services'));
router.use('/gallery', require('./gallery'));
router.use('/testimonials', require('./testimonials'));
router.use('/contact', require('./contact'));
router.use('/products', require('./products'));
router.use('/partnership', require('./partnership'));

// Admin routes (require auth)
const auth = require('../middleware/auth');
router.use('/auth', require('./auth'));
router.use('/admin/hero', auth, require('./admin/hero'));
router.use('/admin/about', auth, require('./admin/about'));
router.use('/admin/services', auth, require('./admin/services'));
router.use('/admin/products', auth, require('./admin/products'));
router.use('/admin/gallery', auth, require('./admin/gallery'));
router.use('/admin/testimonials', auth, require('./admin/testimonials'));
router.use('/admin/contact', auth, require('./admin/contact'));
router.use('/admin/social-media', auth, require('./admin/socialMedia'));
router.use('/admin/messages', auth, require('./admin/messages'));
router.use('/admin/settings', auth, require('./admin/settings'));
router.use('/admin/business-hours', auth, require('./admin/businessHours'));
router.use('/admin/partnership', auth, require('./admin/partnership'));

module.exports = router;