const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const buyerController = require('../controllers/buyerController');

router.get('/market/categories', buyerController.getCategories);
router.get('/market/products', buyerController.getProducts);
router.get('/products/:product_ID', buyerController.getProductDetails);
router.post('/cart', authMiddleware, buyerController.addToCart);
router.get('/cart', authMiddleware, buyerController.getCart);
router.post('/checkout', authMiddleware, buyerController.checkout);
router.get('/orders', authMiddleware, buyerController.getOrders);

module.exports = router;