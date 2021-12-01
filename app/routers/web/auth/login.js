// Require
const express = require('express');
const router = express.Router();



// Require Routres
const LoginController = require('app/http/controllers/auth/loginController');
const redirectFauthenticated = require('app/middleware/redirectFauthenticated');

// Route
router.get('/', redirectFauthenticated.handel, LoginController.loginPage);
router.post('/', redirectFauthenticated.handel, LoginController.loginPagePost);





module.exports = router;