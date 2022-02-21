// Require
const express = require('express');
const router = express.Router();


// Middlewares
const redirectIfNotAdmin = require('app/middleware/redirectIfNotAdmin');
const errorHandler = require('app/middleware/errorHandler');

// Require routers
const HomeRouter = require('./web/home');
const AdminRouter = require('./web/admin/admin');


// Home Router
router.use('/', HomeRouter);


// Admin Router
router.use('/admin', redirectIfNotAdmin.handel, AdminRouter);


router.all('*', errorHandler.error404);

router.use(errorHandler.handler);




module.exports = router;