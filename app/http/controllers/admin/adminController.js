// Require
const Controller = require('./../controller')

module.exports = new class AdminController extends Controller {
    index(req, res, next) {
        try {
            res.render('admin/index', { title: 'پنل ادمین' })
        } catch (err) {
            next(err)
        }
    };
};