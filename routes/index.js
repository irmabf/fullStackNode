const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
// Do work here
router.get('/', productController.homePage);
router.get('/add', productController.addProduct);
router.post('/add', productController.createProduct);

module.exports = router;
