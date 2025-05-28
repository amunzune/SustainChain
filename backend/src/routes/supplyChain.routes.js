const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin, isAnalyst } = require('../middleware/authJwt');
const supplyChainController = require('../controllers/supplyChain.controller');

// Protected routes for nodes
router.get('/nodes', [verifyToken], supplyChainController.getAllNodes);
router.get('/nodes/:id', [verifyToken], supplyChainController.getNodeById);
router.post('/nodes', [verifyToken, isAnalyst], supplyChainController.createNode);
router.put('/nodes/:id', [verifyToken, isAnalyst], supplyChainController.updateNode);
router.delete('/nodes/:id', [verifyToken, isAdmin], supplyChainController.deleteNode);
router.get('/nodes/product/:productId', [verifyToken], supplyChainController.getNodesByProduct);

// Protected routes for connections
router.get('/connections', [verifyToken], supplyChainController.getAllConnections);
router.get('/connections/:id', [verifyToken], supplyChainController.getConnectionById);
router.post('/connections', [verifyToken, isAnalyst], supplyChainController.createConnection);
router.put('/connections/:id', [verifyToken, isAnalyst], supplyChainController.updateConnection);
router.delete('/connections/:id', [verifyToken, isAdmin], supplyChainController.deleteConnection);

// Supply chain map and data import
router.get('/map', [verifyToken], supplyChainController.getSupplyChainMap);
router.post('/import', [verifyToken, isAnalyst], supplyChainController.importSupplyChainData);

module.exports = router;
