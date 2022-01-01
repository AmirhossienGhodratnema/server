// Require
const Controller = require('./../controller')
const fs = require('fs');
const path = require('path')
const sharp = require('sharp');


// Models
const Course = require('app/models/courses');
const Episodes = require('app/models/episodes');





// Helper Upload Image
module.exports = new class EpisodesController extends Controller {
    async index(req, res) {
        try {
            let page = req.query.page || 1
            let episodes = await Episodes.paginate({}, { page, sort: { createdAt: -1 }, limit: 10 })
            res.render('admin/episode/index', { title: 'جلسات دوره', episodes });
        } catch (err) {
            next(err)
        }
    };

    async create(req, res, next) {
        try {
            let courses = await Course.find({})
            res.render('admin/episode/create', { courses, title: 'افزودن جلسه' });
        } catch (err) {
            next(err)
        }
    };

    async store(req, res, next) {
        try {
            let result = await this.validationData(req);

            if (result) {

                let { title, course, videoUrl, time, body, type, number } = req.body;
                // console.log(...req.body)
                let newEpisode = new Episodes({ ...req.body });

                await newEpisode.save(err => {
                    if (err) throw err;
                });

                return res.redirect('/admin/episode');
            };

            return this.back(req, res);

        } catch (err) {
            next(err)
        }
    };



    async distroy(req, res, next) {
        try {
            let episode = await Episodes.findOne({ _id: req.params.id })
            if (!episode) {
                req.flash('massage', 'چنین دوره ای وجود ندارد');
                console.log('Not Course')
            }


            episode.remove()
            res.redirect('/admin/episode');
        } catch (err) {
            next(err)

        }
    }


    async edit(req, res, next) {
        try {
            this.isMongoId(req.params.id);

            let episode = await Episodes.findOne({ _id: req.params.id })

            if (!episode) {
                throw new Error('چنین دوره ای وجود ندارد')
            } else {
                res.render('admin/episode/edit', { title: 'ویرایش دوره ', episode })
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


};