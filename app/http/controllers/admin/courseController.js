// Require
const Controller = require('./../controller')
const fs = require('fs');
const path = require('path')
const sharp = require('sharp');


// Models
const Course = require('app/models/courses');
const Category = require('./../../../models/category');



// Helper Upload Image

module.exports = new class CourseController extends Controller {
    async index(req, res) {
        try {
            let page = req.query.page || 1
            let course = await Course.paginate({}, { page, sort: { createdAt: -1 }, limit: 10 })
            res.render('admin/courses/index', { title: 'دوره ها', course });
        } catch (err) {
            next(err)
        }
    };

    async create(req, res, next) {
        try {
            let category = await Category.find({parent : null})

            res.render('admin/courses/create', { title: 'افزودن دوره' , category });
        } catch (err) {
            next(err)
        }
    };

    async store(req, res, next) {
        try {

            let result = await this.validationData(req);

            if (req.file && req.flash('massage').length > 0) {
                fs.unlink(req.file.path, (err) => { })
            };

            if (result) {

                let images = this.imageResize(req.file);
                let { title, type, body, tags, price, fingerImage } = req.body;

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

        } catch (err) {
            next(err)
        }
    };


    imageResize(image) {
        let imageInfo = path.parse(image.path)

        let addresImage = {}
        addresImage['orginal'] = this.getUrlImage(image.destination, image.filename);


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

    async distroy(req, res, next) {
        try {
            let course = await Course.findOne({ _id: req.params.id })
            if (!course) {
                req.flash('massage', 'چنین دوره ای وجود ندارد');
                console.log('Not Course')
            }

            Object.values(course.images).map(image => {
                fs.unlink(image, (err) => { })
            });

            course.remove()
            res.redirect('/admin/courses');
        } catch (err) {
            next(err)

        }
    }


    async edit(req, res, next) {

        try {
            this.isMongoId(req.params.id)

            let course = await Course.findOne({ _id: req.params.id });
            let category = await Category.find({});

            
            if (!course) {
                throw new Error('چنین دوره ای وجود ندارد')
            } else {
                res.render('admin/courses/edit', { title: 'ویرایش دوره ', course , category})
            };
        } catch (err) {
            next(err)
        }
    };


    async update(req, res, next) {
        try {
            let status = await this.validationData(req);


            let objUpdateData = {}

            if (!status) {
                if (req.file && req.flash('massage').length > 0) {
                    return fs.unlink(req.file.path, (err) => { })
                };
            };

            if (!status) {
                return this.back(req, res)
            };


            if (req.file) {
                objUpdateData.images = this.imageResize(req.file);
                objUpdateData.fingerImage = objUpdateData.images['480']
            }


            await Course.findByIdAndUpdate(req.params.id, { $set: { ...req.body, ...objUpdateData } })
            return res.redirect('/admin/courses')


        } catch (err) {
            next(err)
        }
    };


    getUrlImage(dir, name) {
        return dir.substring(10) + '/' + name
    };


    slug(title) {
        return title.replace(/([^۰-۹آ-یa-z0-9]|-)+/g, "-")
    };


};