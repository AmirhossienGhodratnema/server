// Require
const Controller = require('./controller');
const passport = require('passport')

module.exports = new class HomeController extends Controller {
    // Get home page view
    index(req, res) {
        res.render('home');         // Render home.ejs file
    };
};