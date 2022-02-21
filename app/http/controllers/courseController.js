// Require
const Controller = require('./controller');

const Course = require('app/models/courses');
const Episodes = require('app/models/episodes');
const Comments = require('app/models/comments');
const User = require('app/models/user');

module.exports = new class HomeController extends Controller {
    // Get home page view
    async courses(req, res) {
        try {
            let courses = await Course.find({})
            res.render('home/courses', { courses });
        } catch (err) {
            next(err);
        }
    };

    async about(req, res) {
        try {
            res.render('home/about-me');
        } catch (err) {
            next(err);
        }
    };

    async single(req, res) {
        try {
            let course = await Course.findById(req.params.id).populate([
                {
                    path: 'user',
                    select: ['name'],
                },
                {
                    path: 'episode',
                },
                {
                    path: 'comments',
                },
            ]).exec()

            let canUse = await this.canUse(req, course)

            // return res.json(course);


            res.render('home/single', { course, canUse });
        } catch (err) {
            next(err);
        }
    };

    async canUse(req, course) {
        let canUse = false;
        if (req.isAuthenticated()) {
            switch (course.type) {
                case 'vip':
                    canUse = req.user.isVip()
                    break;
                case 'cash':
                    canUse = true
                    break;
                default:
                    break;
            }
        }
        return canUse
    }
};




