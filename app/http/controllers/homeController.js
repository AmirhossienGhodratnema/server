// Require
const Controller = require('./controller');

module.exports = new class HomeController extends Controller {
    // Get home page view
    index(req, res) {
        res.render('home/index');         // Render home.ejs file
    };
};