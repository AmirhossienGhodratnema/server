// Require
const Controller = require('app/http/controllers/controller');
const passport = require('passport')

module.exports = new class RegisterController extends Controller {

    registerData(req, res) {
        res.render('register', {
            captcha: this.recaptcha.render(),
            massage: req.flash('massage'),
        });
    };


    registerDataPost(req, res, next) {
        this.validationRecaptcha(req, res)
            .then(result => this.validationData(req))
            .then(result => {
                if (result) this.register(req, res, next)
                else res.redirect('/register');
            })
    };

    // Validation Data Method
    validationData(req) {
        req.checkBody('name', 'نام کاربری یا ایمیل خود را وارد کنید').notEmpty()
        req.checkBody('password', 'پسورد را وارد کنید').notEmpty()
        req.checkBody('password', 'پسورد نمیتواند کم تر از 8 کاراکتر باشد').isLength({ min: 8 })
        req.checkBody('email', 'ایمیل نمیتواند خالی باشد').notEmpty()
        req.checkBody('email', 'فرمت ایمیل را به درستی وارد کنید').isEmail()

        return req.getValidationResult()
            .then(result => {
                const errors = result.array();
                const msg = [];
                errors.forEach(item => msg.push(item.msg));

                if (errors.length == 0)
                    return true;

                req.flash('massage', msg)
                return false;
            })
    }

    // Check Data in DB
    register(req, res, next) {
        passport.authenticate('local.register', {
            successRedirect: '/',
            failureRedirect: '/register',
            failureFlash: true,
        })(req, res, next);
    };
};