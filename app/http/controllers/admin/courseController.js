// Require
const Controller = require('./../controller')

module.exports = new class CourseController extends Controller {
    index(req, res) {
        res.render('admin/courses/index',{title: 'دوره ها'})
    };
};