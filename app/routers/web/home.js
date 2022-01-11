// Require
const express = require('express');
const router = express.Router();


// Require routres
const HomeController = require('app/http/controllers/homeController');
const CourseController = require('app/http/controllers/courseController');

// const LoginRoute = require('app/routers/web/auth/login');
const auth = require('app/routers/web/auth');


// User logout root settings
router.get('/logout', (req, res) => {
    req.logOut();
    res.clearCookie('remember_token');
    res.redirect('/');
});


// Route
router.get('/', HomeController.index);
router.get('/courses', CourseController.courses);
router.get('/about-me', CourseController.about);

router.get('/courses/:id', CourseController.single);


// Roots in other files.
router.use('/auth', auth);
// router.use('/register', RegisterRoute)






module.exports = router;