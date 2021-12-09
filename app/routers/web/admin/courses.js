const express = require('express');
const router = express.Router();


const CourseController = require('app/http/controllers/admin/courseController')

router.get('/',CourseController.index);
router.get('/create',CourseController.create);

module.exports = router;