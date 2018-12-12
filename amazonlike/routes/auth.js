const express = require('express');
const { check, body } = require('express-validator/check');

const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.get('/login', authController.getLogin);

router.post('/login',
    [ 
        body('email')
            .isEmail()
            .withMessage('Not valid email'),
        body('password')
            .isAlphanumeric()
            .isLength({min: 5})
            .withMessage('Password is not valid')
    ], 
    authController.postLogin
);

router.get('/signup', authController.getSignup);

router.post('/signup',
    [
        check('email')
            .isEmail()
            .withMessage('go fuck yourself')
            .custom((value, {req}) => {
                return User.findOne( { email: value } )
                    .then(userDoc => {
                        if(userDoc) {
                            return Promise.reject('There exists an account associated with that email address.')
                        }
                    })
            }),
        body('password', 'Please enter a password with only numbers and text and at least 5 characters long')
            .isLength({min: 5})
            .isAlphanumeric(),
        body('confirmPassword').custom((value, { req }) => {
            if (value !== req.body.password){
                throw new Error('Passwords have to match');
            }
            return true; 
        })
    ],
    authController.postSignup
);

router.post('/logout', authController.postLogout);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);


module.exports = router;