// Require
const Controller = require('./controller')

module.exports = new class HomeController extends Controller {
    index(req, res) {
        res.render('home');
    };
};