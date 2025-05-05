const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const sellerController = require('../controllers/sellerController');

router.get('/seller/orders', authMiddleware, sellerController.getOrders);
router.post('/seller/products', authMiddleware, sellerController.addProduct);
router.put('/seller/products/:product_ID', authMiddleware, sellerController.updateProduct);
router.delete('/seller/products/:product_ID', authMiddleware, sellerController.deleteProduct);
router.get('/seller/reports', authMiddleware, sellerController.getReports);

module.exports = router;