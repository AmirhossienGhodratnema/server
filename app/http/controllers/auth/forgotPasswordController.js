// Require
const Controller = require('app/http/controllers/controller');
const User = require('app/models/user');
const PasswordReset = require('app/models/passwordReset');
const uniqueString = require('unique-string');



module.exports = new class LoginController extends Controller {

    // Get view informantion login.
    show(req, res) {
        try {
            const title = 'بازیابی رمز عبور'
            res.render('home/showFormResetPassword', {
                captcha: this.recaptcha.render(),           // Show view Recaptcha.
                massage: req.flash('massage'),           // Send validation errors.
                title,
            });
        } catch (err) {
            next(err)
        }
    };


    async passwordResetPagePost(req, res, next) {
        try {
            await this.validationRecaptcha(req, res)            // Recaptcha validation.
            let result = await this.validationData(req)

            if (result) {
                return this.sendResetLink(req, res);
            } else {
                this.back(req, res)

            }
        } catch (err) {
            next(err)
        }
    };


    async sendResetLink(req, res) {
        try {
            let user = await User.findOne({ email: req.body.email });

            if (!user) {
                req.flash('massage', 'چنین کاربری وجود ندارد');
                this.back(req, res);
            };

            let newPasswordReset = new PasswordReset({
                email: req.body.email,
                token: uniqueString()
            });

            let pReset = await newPasswordReset.save();

            res.redirect('/')

        } catch (err) {
            next(err)
        }
    }
};