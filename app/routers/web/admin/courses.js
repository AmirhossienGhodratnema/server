const express = require('express');
const router = express.Router();


const CourseController = require('app/http/controllers/admin/courseController')


router.get('/', CourseController.index);

router.get('/create', CourseController.create);
router.post('/create', CourseController.store);





module.exports = router; 