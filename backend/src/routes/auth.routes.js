const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middleware/authJwt');
const authController = require('../controllers/auth.controller');

// Public routes
router.post('/signup', authController.signup);
router.post('/signin', authController.signin);

module.exports = router;
