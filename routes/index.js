const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
// Do work here
router.get('/', productController.homePage);

module.exports = router;
