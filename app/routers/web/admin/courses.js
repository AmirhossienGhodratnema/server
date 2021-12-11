const express = require('express');
const router = express.Router();


// Controller
const CourseController = require('app/http/controllers/admin/courseController');


// Validation
const CourseCreateValidation = require('app/validation/CourseCreateValidation');


router.get('/', CourseController.index);

router.get('/create', CourseController.create);
router.post('/create', CourseCreateValidation.handel(), CourseController.store);




module.exports = router; 