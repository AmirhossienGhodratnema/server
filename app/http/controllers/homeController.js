// Require
const Controller = require('./controller');

const Course = require('app/models/courses');
const Episodes = require('app/models/episodes');
const User = require('app/models/user');

module.exports = new class HomeController extends Controller {
    // Get home page view
    async index(req, res) {
        try {
            let courses = await Course.find({})
            console.log('course', courses)
            res.render('home/index', { courses });         // Render home.ejs file
        } catch (err) {
            next(err);
        }
    };
};