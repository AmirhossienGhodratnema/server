// Require
const Controller = require('./controller');

const Course = require('app/models/courses');
const Episodes = require('app/models/episodes');
const User = require('app/models/user');

module.exports = new class HomeController extends Controller {
    // Get home page view
    async courses(req, res) {

        try {
            let courses = await Course.find({})
            res.render('home/courses', { courses });         // Render home.ejs file
        } catch (err) {
            next(err);
        }
    };

    async about(req, res) {

        try {
            res.render('home/about-me');         // Render home.ejs file
        } catch (err) {
            next(err);
        }
    };

    async single(req, res) {
        try {
            let course = await Course.findById(req.params.id).populate([
                {
                    path: 'user',
                },
                {
                    path: 'episode'
                }
            ]).exec()
            // return res.json(course)
            let canUse = await this.canUse(req, course)
            res.render('home/single', { course, canUse });         // Render home.ejs file
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
                    console.log("vip")
                    break;
                case 'cash':
                    canUse = true
                    console.log("cash")

                    break;
                default:
                    break;
            }
        }
        return canUse
    }
};




