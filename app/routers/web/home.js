// Require
const express = require('express');
const router = express.Router();

// Require Routres
const HomeController = require('app/http/controllers/homeController');


// Route
router.get('/', HomeController.index);
router.get('/login', HomeController.loginPage);
router.post('/login', HomeController.loginPagePost);
router.get('/register', HomeController.registerData);
router.post('/register', HomeController.registerDataPost);


module.exports = router;