// Require
const express = require('express');
const router = express.Router();


// Require Routres
const HomeController = require('app/http/controllers/homeController');
const RegisterController = require('app/http/controllers/auth/registerController');
const LoginController = require('app/http/controllers/auth/loginController');



// Route
router.get('/', HomeController.index);
router.get('/login', LoginController.loginPage);
router.post('/login', LoginController.loginPagePost);
router.get('/register', RegisterController.registerData);
router.post('/register', RegisterController.registerDataPost);



module.exports = router;