// Require
const express = require('express');
const router = express.Router();

// Require Routres
const HomeController = require('app/http/controllers/homeController');


// Route
router.get('/', HomeController.index);


module.exports = router;