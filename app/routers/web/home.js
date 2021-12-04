// Require
const express = require('express');
const router = express.Router();


// Require routres
const HomeController = require('app/http/controllers/homeController');
// const LoginRoute = require('app/routers/web/auth/login');
const auth = require('app/routers/web/auth');


// Route
router.get('/', HomeController.index);


// Roots in other files.
router.use('/auth', auth);
// router.use('/register', RegisterRoute)


// User logout root settings
router.get('/logout', (req, res) => {
    req.logOut();
    res.clearCookie('remember_token');
    res.redirect('/');
});


module.exports = router;