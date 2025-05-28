const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middleware/authJwt');
const adminController = require('../controllers/admin.controller');

// Protected routes
router.get('/dashboard', [verifyToken, isAdmin], adminController.getAdminDashboard);
router.get('/user-roles', [verifyToken, isAdmin], adminController.getUserRoles);
router.get('/settings', [verifyToken, isAdmin], adminController.getSystemSettings);
router.put('/settings', [verifyToken, isAdmin], adminController.updateSystemSettings);
router.get('/api-config', [verifyToken, isAdmin], adminController.getApiConfiguration);
router.put('/api-config', [verifyToken, isAdmin], adminController.updateApiConfiguration);
router.get('/audit-logs', [verifyToken, isAdmin], adminController.getAuditLogs);

module.exports = router;
