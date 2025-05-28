const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin, isAnalyst } = require('../middleware/authJwt');
const productController = require('../controllers/product.controller');

// Protected routes
router.get('/', [verifyToken], productController.getAllProducts);
router.get('/:id', [verifyToken], productController.getProductById);
router.post('/', [verifyToken, isAnalyst], productController.createProduct);
router.put('/:id', [verifyToken, isAnalyst], productController.updateProduct);
router.delete('/:id', [verifyToken, isAdmin], productController.deleteProduct);
router.get('/supplier/:supplierId', [verifyToken], productController.getProductsBySupplier);
router.put('/:id/verify', [verifyToken, isAnalyst], productController.verifyProduct);

module.exports = router;
