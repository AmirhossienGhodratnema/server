// Require
const express = require('express');
const router = express.Router();


// Require Routres
const LoginController = require('app/http/controllers/auth/loginController');



// Route
router.get('/', LoginController.loginPage);
router.post('/', LoginController.loginPagePost);



module.exports = router;