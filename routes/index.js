const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { catchErrors } = require('../handlers/errorHandlers');
// Do work here
router.get('/', catchErrors(productController.getProducts));
router.get('/products', catchErrors(productController.getProducts));
router.get('/add', productController.addProduct);

router.post('/add', 
    productController.upload,  
    catchErrors(productController.resize),
    catchErrors(productController.createProduct)
  );
  
router.post('/add/:id/', 
    productController.upload,
    catchErrors(productController.resize),
    catchErrors(productController.updateProduct)
);

router.get('/products/:id/edit', catchErrors(productController.editProduct));


module.exports = router;
