// Require
const express = require('express');
const router = express.Router();


// Require routres
const LoginController = require('app/http/controllers/auth/loginController');
const redirectFauthenticated = require('app/middleware/redirectFauthenticated');
const validationRegister = require('app/validation/loginValidation');



// Route
router.get('/', redirectFauthenticated.handel, LoginController.loginPage);
router.post('/', redirectFauthenticated.handel, validationRegister.handel(), LoginController.loginPagePost);


module.exports = router;