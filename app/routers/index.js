// Require
const express = require('express');
const router = express.Router();


// Middlewares
const redirectIfNotAdmin = require('app/middleware/redirectIfNotAdmin');


// Require routers
const HomeRouter = require('./web/home');
const AdminRouter = require('./web/admin/admin');


// Admin Router
router.use('/admin', AdminRouter);

// Home Router
router.use('/', HomeRouter);


module.exports = router;