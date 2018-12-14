const path = require('path');

const express = require('express');

const { check, body } = require('express-validator/check');


const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();



// /admin/add-product => GET
router.get('/add-product',isAuth, adminController.getAddProduct);

// /admin/products => GET
router.get('/products', isAuth, adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', isAuth,
    [
        body('title')
            .isString()
            .withMessage('Can only contain letters and numbers')
            .isLength({min: 3})
            .withMessage('Must be at least 3 characters.')
            .trim(),
        body('price')
            .isFloat()
            .withMessage('Must be a float'),
        body('description')
            .isString()
            .withMessage('Can only contain letters and numbers. ')
            .isLength({ min: 3 })
            .withMessage('Description must be more than two characters.')
            .trim()
    ], 
adminController.postAddProduct);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post('/edit-product', isAuth,
    [
        body('title')
            .isString()
            .withMessage('Can only contain letters and numbers')
            .isLength({min: 3})
            .withMessage('Must be at least 3 characters.')
            .trim(),
        body('price')
            .isFloat()
            .withMessage('Must be a float'),
        body('description')
            .isString()
            .withMessage('Can only contain letters and numbers. ')
            .isLength({ min: 3 })
            .withMessage('Description must be more than two characters.')
            .trim()
    ], 
    adminController.postEditProduct);

router.post('/delete-product', isAuth, adminController.postDeleteProduct);

module.exports = router;
