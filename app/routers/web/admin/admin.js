// Require
const express = require('express');
const router = express.Router();


router.use((req, res, next) => {
    res.locals.layout = 'admin/master';
    next()
});


// Require controller
const AdminController = require('app/http/controllers/admin/adminController');


// Require Routers
const courses = require('./courses')


// Middleware
router.use('/courses' , courses)


// Route
router.get('/', AdminController.index);


module.exports = router;