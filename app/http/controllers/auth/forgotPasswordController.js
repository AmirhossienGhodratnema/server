// Require
const Controller = require('app/http/controllers/controller');
const passport = require('passport');

module.exports = new class LoginController extends Controller {

    // Get view informantion login.
    show(req, res) {
        const title = 'بازیابی رمز عبور'
        res.render('home/showFormResetPassword', {
            captcha: this.recaptcha.render(),           // Show view Recaptcha.
            massage: req.flash('massage'),           // Send validation errors.
            title,
        });
    };


    passwordResetPagePost(req, res, next) {
        this.validationRecaptcha(req, res)          // Recaptcha validation.
            .then(result => this.validationData(req))
            .then(result => {
                if (result) this.login(req, res, next)
                else {
                    // res.redirect('/auth/login')
                    this.back(req, res)
                }
            })
    };
};