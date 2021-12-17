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
router.delete('/:id', courseController.distroy);
router.put('/:id', courseController.distroy);
router.get('/:id/edit', courseController.edit);



// edit

module.exports = router; 