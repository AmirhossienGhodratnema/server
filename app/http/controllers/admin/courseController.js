// Require
const Controller = require('./../controller')


// Models
const Course = require('app/models/courses');


module.exports = new class CourseController extends Controller {
    index(req, res) {
        res.render('admin/courses/index', { title: 'دوره ها' })
    };

    create(req, res) {
        res.render('admin/courses/create', { title: 'افزودن دوره' })
    };

    async store(req, res, next) {
        let result = await this.validationData(req);

        if (result) {

            let image = req.body.images;
            let { title, type, body, tags, price } = req.body;

            let newCourse = new Course({
                user: req.user._id,
                title,
                slug: 'amirhosisne',
                type,
                image,
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

  
};