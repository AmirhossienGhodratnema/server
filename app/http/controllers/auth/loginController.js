// Require
const Controller = require('app/http/controllers/controller');
const passport = require('passport');

module.exports = new class LoginController extends Controller {

    // Get Page
    loginPage(req, res) {
        res.render('login', {
            captcha: this.recaptcha.render(),
            massage: req.flash('massage')
        });
    };


    // Post Data 
    loginPagePost(req, res, next) {
        this.validationRecaptcha(req, res)
            .then(result => this.validationData(req))
            .then(result => {
                if (result) this.login(req, res, next)
                else {
                    res.redirect('/login')
                }
            })
    };


    // Validation Data Method
    validationData(req) {
        req.checkBody('email', 'نام کاربری یا ایمیل خود را وارد کنید').notEmpty()
        req.checkBody('password', 'پسورد را وارد کنید').notEmpty()

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


    login(req, res, next) {
        passport.authenticate('local.login', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true,
        })(req, res, next);
    };
};