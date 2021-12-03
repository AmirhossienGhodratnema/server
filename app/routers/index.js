// Require
const express = require('express');
const router = express.Router();


// Require routers
const HomeRouter = require('./web/home');
const AdminController = require('./web/admin/admin');


// Admin Router
router.use('/admin', AdminController);

// Home Router
router.use('/' , HomeRouter);


module.exports = router;