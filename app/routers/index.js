// Require
const express = require('express');
const router = express.Router();


// Require Routers
const HomeRouter = require('./web/home');
const AdminController = require('./web/admin/admin');

console.log('amirhossien')
console.log('amirhossien')

// Admin Router
router.use('/admin', AdminController);


// Home Router
router.use('/' , HomeRouter);



module.exports = router;