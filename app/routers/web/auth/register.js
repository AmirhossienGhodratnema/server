// Require
const express = require('express');
const router = express.Router();


// Require routres
const RegisterController = require('app/http/controllers/auth/registerController');
const redirectFauthenticated = require('app/middleware/redirectFauthenticated');
const validationRegister = require('app/validation/registerValidation');


// Route
router.get('/', redirectFauthenticated.handel, RegisterController.registerData);
router.post('/', redirectFauthenticated.handel, validationRegister.handel(), RegisterController.registerDataPost);


module.exports = router;