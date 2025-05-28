const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin, isAnalyst } = require('../middleware/authJwt');
const satelliteController = require('../controllers/satellite.controller');

// Protected routes
router.get('/', [verifyToken], satelliteController.getAllAlerts);
router.get('/:id', [verifyToken], satelliteController.getAlertById);
router.post('/', [verifyToken, isAnalyst], satelliteController.createAlert);
router.put('/:id', [verifyToken, isAnalyst], satelliteController.updateAlert);
router.delete('/:id', [verifyToken, isAdmin], satelliteController.deleteAlert);
router.get('/region/:region', [verifyToken], satelliteController.getAlertsByRegion);
router.post('/generate-mock', [verifyToken, isAnalyst], satelliteController.generateMockAlerts);

module.exports = router;
