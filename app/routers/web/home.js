// Require
const express = require('express');
const router = express.Router();


// Require Routres
const HomeController = require('app/http/controllers/homeController');

const LoginRoute = require('app/routers/web/auth/login');
const RegisterRoute = require('app/routers/web/auth/register');


// Route
router.get('/', HomeController.index);

router.use('/login', LoginRoute);
router.use('/register' , RegisterRoute)
// router.use('/register', RegisterRoute);



module.exports = router;