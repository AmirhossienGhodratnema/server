// Require
const express = require('express');
const router = express.Router();
// const user = require('app/models/user')
// const user = require('./.././../models/user')

// Require Routres
const HomeController = require('app/http/controllers/homeController');

console.log(require('app/models/user'))



// Route
router.get('/', HomeController.index);
router.get('/login', HomeController.loginPage);
router.post('/login', HomeController.loginPagePost);
router.get('/register', HomeController.registerData);
router.post('/register', HomeController.registerDataPost);

// console.log('Amirhosisen')

module.exports = router;