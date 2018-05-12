const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { catchErrors } = require('../handlers/errorHandlers');
// Do work here
router.get('/', productController.homePage);
router.get('/add', productController.addProduct);
router.post('/add', catchErrors(productController.createProduct));

module.exports = router;
