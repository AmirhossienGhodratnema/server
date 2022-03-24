// Require
const Controller = require('./../controller')
const User = require('./../../../models/user')
const Courses = require('./../../../models/courses');
const user = require('./../../../models/user');


module.exports = new class UserController extends Controller {
    async index(req, res, next) {
        try {
            let users = await User.find({}).sort({ createdAt: -1 });
            res.render('admin/user/index', { title: 'اکانت کاربری', users })
        } catch (err) {
            next(err)
        }
    };


    async distroy(req, res, next) {
        try {

            let users = await User.findById(req.params.id).populate({ path: 'courses', populate: 'episode' })

            users.courses.forEach(course => {
                course.episode.forEach(episod => { episod.remove() })
                course.remove()
            });

            users.remove()


            return res.redirect('/admin/users')
        } catch (err) {
            next(err)
        }
    }


    async ToAdmin(req, res, next) {
        try {

            let user = await User.findById(req.params.id)            


            user.set({admin : ! user.admin});
            await user.save()

            return res.redirect('/admin/users')
        } catch (err) {
           next(err);
        }
    }
};