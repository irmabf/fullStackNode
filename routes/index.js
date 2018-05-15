const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
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

router.get('/product/:slug', catchErrors(productController.getProductBySlug));

router.get('/tags', catchErrors(productController.getProductsByTag));

router.get('/tags/:tag', catchErrors(productController.getProductsByTag));

router.get('/login', userController.loginForm);

router.get('/register', userController.registerForm)
//1. Validate registration data 
//2. Register the user
//3. Log the users in
router.post('/register',
    userController.validateRegister,
    userController.register,
    authController.login
);

module.exports = router;
