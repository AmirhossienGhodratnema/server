// Require
const Controller = require('./../controller')


// Models
const Course = require('app/models/courses');


// Helper Upload Image

module.exports = new class CourseController extends Controller {
    index(req, res) {
        res.render('admin/courses/index', { title: 'دوره ها' });
    };

    create(req, res) {
        res.render('admin/courses/create', { title: 'افزودن دوره' });
    };

    async store(req, res, next) {
        let result = await this.validationData(req);

        if (result) {

            let images = req.body.images;
            let { title, type, body, tags, price, slug } = req.body;

            let newCourse = new Course({
                user: req.user._id,
                title,
                slug: this.slug(title),
                type,
                images,
                body,
                tags,
                price
            });



            await newCourse.save(err => {
                if (err) throw err;
            });

            return res.redirect('/admin/courses');


        };


        return this.back(req, res);

    };

    slug(title) {
        return title.replace(/([^۰-۹آ-یa-z0-9]|-)+/g, "-")
    }


};