const express = require('express');
const router = express.Router();


// Require routres
const LoginController = require('app/http/controllers/auth/loginController');

const RegisterController = require('app/http/controllers/auth/registerController');

const validationRegister = require('app/validation/loginValidation');
const redirectFauthenticated = require('app/middleware/redirectFauthenticated');



// Route
router.get('/login', redirectFauthenticated.handel, LoginController.loginPage);
router.post('/login', redirectFauthenticated.handel, validationRegister.handel(), LoginController.loginPagePost);

router.get('/register', redirectFauthenticated.handel, RegisterController.registerData);
router.post('/register', redirectFauthenticated.handel, validationRegister.handel(), RegisterController.registerDataPost);


module.exports = router;