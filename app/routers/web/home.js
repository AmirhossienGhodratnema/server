// Require
const express = require('express');
const router = express.Router();


// Require routres
const HomeController = require('app/http/controllers/homeController');
const CourseController = require('app/http/controllers/courseController');
const CommentController = require('app/http/controllers/commentController');

// Validation
const CommentValidation = require('./../../../app/validation/commentValidation');



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
router.post('/comments', CommentValidation.handel(), CommentController.index);
router.get('/about-me', CourseController.about);
router.get('/courses/:id', CourseController.single);
router.use('/auth', auth);


// search
router.get('/search', CourseController.search);


// Payment Cach
router.post('/course/payment' , CourseController.payment)









module.exports = router;