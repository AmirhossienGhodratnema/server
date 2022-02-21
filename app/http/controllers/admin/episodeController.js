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
            let courses = await Course.find({})
            let episodes = await Episodes.paginate({}, { page, sort: { createdAt: -1 }, limit: 10 })
            res.render('admin/episode/index', { title: 'جلسات دوره', episodes, courses });
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
                let newEpisode = new Episodes({ ...req.body });
                await newEpisode.save(err => {
                    if (err) throw err;
                });
                await this.updateCourseTime(req.body.course)
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
            let courseId = episode.course;
            episode.remove()
            await this.updateCourseTime(courseId)
            res.redirect('/admin/episode');
        } catch (err) {
            next(err)

        }
    }


    async edit(req, res, next) {
        try {
            this.isMongoId(req.params.id);
            let episode = await Episodes.findOne({ _id: req.params.id })
            let courses = await Course.find({})
            if (!episode) {
                throw new Error('چنین دوره ای وجود ندارد')
            } else {
                res.render('admin/episode/edit', { title: 'ویرایش دوره ', episode, courses })
            };
        } catch (err) {
            next(err)
        }
    };


    async update(req, res, next) {
        try {
            let status = await this.validationData(req);
            if (!status) {
                return this.back(req, res)
            };

            let episode = await Episodes.findByIdAndUpdate(req.params.id, { $set: { ...req.body } })

            // Prevent course Update
            this.updateCourseTime(episode.course);

            // Now course update
            this.updateCourseTime(req.body.course)

            return res.redirect('/admin/episode')
        } catch (err) {
            next(err)
        }
    };


    async updateCourseTime(courseId) {
        let course = await Course.findById(courseId).populate('episode').exec()
        course.$set({ time: await this.getTime(course.episode) })
        course.save();
    }
};