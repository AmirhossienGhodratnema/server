// Require
const Controller = require('./../controller')

module.exports = new class AdminController extends Controller {
    index(req, res) {
        res.render('admin/index',{title: 'پنل ادمین'})
    };
};