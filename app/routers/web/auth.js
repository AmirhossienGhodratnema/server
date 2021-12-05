const express = require('express');
const router = express.Router();
const passport = require('passport')


// Require routres
const LoginController = require('app/http/controllers/auth/loginController');
const RegisterController = require('app/http/controllers/auth/registerController');
const forgotPasswordController = require('app/http/controllers/auth/forgotPasswordController');


// Validation
const validationLogin = require('app/validation/loginValidation');
const validationRegister = require('app/validation/registerValidation');
const forgotValidation = require('app/validation/forgotValidation');


// middlewares
const redirectFauthenticated = require('app/middleware/redirectFauthenticated');


// Route
router.get('/login', redirectFauthenticated.handel, LoginController.loginPage);
router.post('/login', redirectFauthenticated.handel, validationLogin.handel(), LoginController.loginPagePost);

router.get('/register', redirectFauthenticated.handel, RegisterController.registerData);
router.post('/register', redirectFauthenticated.handel, validationRegister.handel(), RegisterController.registerDataPost);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { successRedirect: '/', failureRedirect: '/auth/register' }))


router.get('/password/reset', forgotPasswordController.show)
router.post('/password/reset', forgotValidation.handel(), forgotPasswordController.passwordResetPagePost)


module.exports = router;