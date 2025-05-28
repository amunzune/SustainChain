const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin, isAnalyst } = require('../middleware/authJwt');
const organizationController = require('../controllers/organization.controller');

// Protected routes
router.get('/', [verifyToken], organizationController.getAllOrganizations);
router.get('/:id', [verifyToken], organizationController.getOrganizationById);
router.post('/', [verifyToken, isAdmin], organizationController.createOrganization);
router.put('/:id', [verifyToken, isAdmin], organizationController.updateOrganization);
router.delete('/:id', [verifyToken, isAdmin], organizationController.deleteOrganization);

module.exports = router;
