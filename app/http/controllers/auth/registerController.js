// Require
const Controller = require('app/http/controllers/controller');
const passport = require('passport');

module.exports = new class RegisterController extends Controller {

    // Get view informantion Register.
    registerData(req, res) {
        try {
            const title = 'ثبت نام'
            res.render('home/register', {
                captcha: this.recaptcha.render(),           // Show view Recaptcha.
                title,
            });
        } catch (err) {
            next(err)
        }
    };

    // Send information register.
    registerDataPost(req, res, next) {
        try {
            this.validationRecaptcha(req, res)          // Recaptcha validation.
                .then(result => this.validationData(req))
                .then(result => {
                    if (result) this.register(req, res, next)

                    else {
                        req.flash('formData', req.body)
                        res.redirect('/auth/register');
                    }

                })
        } catch (err) {
            next(err)
        }
    };


    //  User register.
    register(req, res, next) {
        try {
            passport.authenticate('local.register', {
                successRedirect: '/',
                failureRedirect: '/auth/register',
                failureFlash: true,
            })(req, res, next);
        } catch (err) {
            next(err)
        }
    };
};