// Require
const express = require('express');
const router = express.Router();


// Require Routres
const RegisterController = require('app/http/controllers/auth/registerController');


// Route
router.get('/', RegisterController.registerData);
router.post('/', RegisterController.registerDataPost);



module.exports = router;