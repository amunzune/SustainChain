const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin, isAnalyst } = require('../middleware/authJwt');
const supplierController = require('../controllers/supplier.controller');

// Protected routes
router.get('/', [verifyToken], supplierController.getAllSuppliers);
router.get('/:id', [verifyToken], supplierController.getSupplierById);
router.post('/', [verifyToken, isAnalyst], supplierController.createSupplier);
router.put('/:id', [verifyToken, isAnalyst], supplierController.updateSupplier);
router.delete('/:id', [verifyToken, isAdmin], supplierController.deleteSupplier);
router.post('/:id/calculate-risk', [verifyToken, isAnalyst], supplierController.calculateRiskScore);

module.exports = router;
