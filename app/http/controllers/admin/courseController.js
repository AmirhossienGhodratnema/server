// Require
const Controller = require('./../controller')
const fs = require('fs');
const path = require('path')
const sharp = require('sharp');


// Models
const Course = require('app/models/courses');



// Helper Upload Image

module.exports = new class CourseController extends Controller {
    index(req, res) {
        res.render('admin/courses/index', { title: 'دوره ها' });
    };

    create(req, res, next) {
        res.render('admin/courses/create', { title: 'افزودن دوره' });
    };

    async store(req, res, next) {
        let result = await this.validationData(req);

        console.log(req.body)


        if (req.file) {
            fs.unlink(req.file.path, (err) => { })
        };

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

    imageResize(image) {
        let imageInfo = path.parse(image.path);

        let addresImage = {}
        addresImage['original'] = this.getUrlImage(image.destination, image.originalname);



        return addresImage;

    }

    getUrlImage(dir, name) {
        return dir.substring(12) + '/' + name
    }




    slug(title) {
        return title.replace(/([^۰-۹آ-یa-z0-9]|-)+/g, "-")
    }


};