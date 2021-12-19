const express = require('express');
const router = express.Router();





// Upload file
const upload = require('app/hellper/uploadimage');


// Controller
const courseController = require('app/http/controllers/admin/courseController');


// Validation
const CourseCreateValidation = require('app/validation/CourseCreateValidation');


const convertFileToField = require('app/middleware/convertFileToField')

router.get('/', courseController.index);

router.get('/create', courseController.create);
router.post('/create', upload.single('images'), convertFileToField.handel, CourseCreateValidation.handel(), courseController.store);

router.delete('/:id', upload.single('images'), courseController.distroy);

router.get('/:id/edit', courseController.edit);
router.put('/:id', upload.single('images'), convertFileToField.handel, CourseCreateValidation.handel(), courseController.update);




// edit

module.exports = router; 