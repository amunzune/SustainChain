const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin, isAnalyst } = require('../middleware/authJwt');
const kpiController = require('../controllers/kpi.controller');

// Protected routes
router.get('/', [verifyToken], kpiController.getAllKPIs);
router.get('/:id', [verifyToken], kpiController.getKPIById);
router.post('/', [verifyToken, isAnalyst], kpiController.createKPI);
router.put('/:id', [verifyToken, isAnalyst], kpiController.updateKPI);
router.delete('/:id', [verifyToken, isAdmin], kpiController.deleteKPI);
router.get('/organization/:organizationId', [verifyToken], kpiController.getKPIsByOrganization);
router.get('/category/:category', [verifyToken], kpiController.getKPIsByCategory);
router.get('/calculate/dcf/:organizationId', [verifyToken], kpiController.calculateDCFPercentage);
router.get('/calculate/grievance-resolution/:organizationId', [verifyToken], kpiController.calculateGrievanceResolutionRate);
router.get('/calculate/supplier-sustainability/:organizationId', [verifyToken], kpiController.calculateSupplierSustainabilityRate);

module.exports = router;
