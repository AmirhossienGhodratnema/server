// Require
const Controller = require('./controller');

const Course = require('app/models/courses');
const Episodes = require('app/models/episodes');
const User = require('app/models/user');

module.exports = new class HomeController extends Controller {
    // Get home page view
    async courses(req, res) {

        try {
            res.render('home/courses');         // Render home.ejs file
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
};




