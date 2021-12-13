const express = require('express');
const router = express.Router();





// Upload file
const uploadimage = require('app/hellper/uploadimage');



// Controller
const CourseController = require('app/http/controllers/admin/courseController');


// Validation
const CourseCreateValidation = require('app/validation/CourseCreateValidation');


const convertFileToField = require('app/middleware/convertFileToField')

router.get('/', CourseController.index);

router.get('/create', CourseController.create);

router.post('/create', uploadimage.single('images'), convertFileToField.handel, CourseCreateValidation.handel(), CourseController.store);


module.exports = router; 