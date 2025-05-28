const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin, isAnalyst } = require('../middleware/authJwt');
const grievanceController = require('../controllers/grievance.controller');

// Protected routes
router.get('/', [verifyToken], grievanceController.getAllGrievances);
router.get('/:id', [verifyToken], grievanceController.getGrievanceById);
router.post('/', [verifyToken, isAnalyst], grievanceController.createGrievance);
router.put('/:id', [verifyToken, isAnalyst], grievanceController.updateGrievance);
router.delete('/:id', [verifyToken, isAdmin], grievanceController.deleteGrievance);
router.get('/supplier/:supplierId', [verifyToken], grievanceController.getGrievancesBySupplier);
router.get('/heatmap/data', [verifyToken], grievanceController.getGrievanceHeatmap);

module.exports = router;
