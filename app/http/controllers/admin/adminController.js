// Require
const Controller = require('./../controller')

module.exports = new class AdminController extends Controller {
    index(req, res) {
        res.json('Admin Page');
    };

    course(req, res) {
        res.json('course Page')
    };
};