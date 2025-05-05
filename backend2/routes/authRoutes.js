const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// เส้นทางสำหรับลงทะเบียน
router.post('/register', authController.register);

// เส้นทางสำหรับล็อกอิน
router.post('/login', authController.login);

module.exports = router;