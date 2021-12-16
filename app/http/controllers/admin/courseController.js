// Require
const Controller = require('./../controller')
const fs = require('fs');
const path = require('path')
const sharp = require('sharp');


// Models
const Course = require('app/models/courses');



// Helper Upload Image

module.exports = new class CourseController extends Controller {
    async index(req, res) {
        let page = req.query.page || 1
        let course = await Course.paginate({}, { page, sort: { createdAt: -1 }, limit: 10 })
        // return res.json(course)




        res.render('admin/courses/index', { title: 'دوره ها', course });
    };

    create(req, res, next) {
        res.render('admin/courses/create', { title: 'افزودن دوره' });
    };

    async store(req, res, next) {
        let result = await this.validationData(req);





        if (req.file && req.flash('massage').length > 0) {
            fs.unlink(req.file.path, (err) => { })
        };

        // console.log('fingerImage', fingerImage)

        if (result) {
            let images = this.imageResize(req.file);
            console.log('images' , images)
            let { title, type, body, tags, price, fingerImage } = req.body;

            // console.log('image' ,images['480'])

            let newCourse = new Course({
                user: req.user._id,
                title,
                slug: this.slug(title),
                type,
                fingerImage: images['480'],
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
        let imageInfo = path.parse(image.path)

        let addresImage = {}
        addresImage['orginal'] = this.getUrlImage(image.destination, image.originalname);


        const resize = size => {
            let imageName = `${imageInfo.name}-${size}-${imageInfo.ext}`;

            addresImage[size] = this.getUrlImage(image.destination, imageName);

            sharp(image.path)
                .resize(size, null)
                .toFile(`${image.destination}/${imageName}`)
        };

        [1080, 720, 480].map(resize)

        return addresImage
    }



    getUrlImage(dir, name) {
        return dir + '/' + name
    }

    slug(title) {
        return title.replace(/([^۰-۹آ-یa-z0-9]|-)+/g, "-")
    }


};