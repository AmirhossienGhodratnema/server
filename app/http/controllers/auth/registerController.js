// Require
const Controller = require('app/http/controllers/controller');
const passport = require('passport');

module.exports = new class RegisterController extends Controller {

    // Get view informantion Register.
    registerData(req, res) {
        const title = 'ثبت نام'
        res.render('home/register', {
            captcha: this.recaptcha.render(),           // Show view Recaptcha.
            massage: req.flash('massage'),          // Send validation errors.
            title,
        });
    };

    // Send information register.
    registerDataPost(req, res, next) {
        this.validationRecaptcha(req, res)          // Recaptcha validation.
            .then(result => this.validationData(req))
            .then(result => {
                if (result) this.register(req, res, next)
                else res.redirect('/auth/register');
            })
    };


    //  User register.
    register(req, res, next) {
        passport.authenticate('local.register', {
            successRedirect: '/',
            failureRedirect: '/auth/register',
            failureFlash: true,
        })(req, res, next);
    };
};