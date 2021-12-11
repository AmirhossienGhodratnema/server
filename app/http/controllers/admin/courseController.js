// Require
const Controller = require('./../controller')

module.exports = new class CourseController extends Controller {
    index(req, res) {
        res.render('admin/courses/index', { title: 'دوره ها' })
    };

    create(req, res) {
        res.render('admin/courses/create', { title: 'افزودن دوره' })
    };

    async store(req, res, next) {
        let result = await this.validationData(req);

        if (result)
            return res.redirect('/admin/courses');

        return this.back(req, res)

    }
};