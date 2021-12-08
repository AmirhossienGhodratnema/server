// Require
const Controller = require('app/http/controllers/controller');
const User = require('app/models/user');
const PasswordReset = require('app/models/passwordReset');
const uniqueString = require('unique-string');



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


    async passwordResetPagePost(req, res, next) {
        await this.validationRecaptcha(req, res)            // Recaptcha validation.
        let result = await this.validationData(req)

        if (result) {
            return this.sendResetLink(req, res);
        } else {
            this.back(req, res)

        }
    };


    async sendResetLink(req, res) {
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

        // Send

        // req.flash('seccess', 'عملیات با موفقیت انجام شد')
        res.redirect('/')

    }
};