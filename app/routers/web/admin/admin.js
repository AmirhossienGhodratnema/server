// Require
const express = require('express');
const router = express.Router();


// Require Routers
const AdminController = require('app/http/controllers/admin/adminController');


// Route
router.get('/' ,AdminController.index);
router.get('/course' ,AdminController.course);

module.exports = router;