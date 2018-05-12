const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { catchErrors } = require('../handlers/errorHandlers');
// Do work here
router.get('/', catchErrors(productController.getProducts));
router.get('/products', catchErrors(productController.getProducts));
router.get('/add', productController.addProduct);
router.post('/add', catchErrors(productController.createProduct));

module.exports = router;
