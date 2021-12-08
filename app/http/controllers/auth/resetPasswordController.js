// Require
const Controller = require('app/http/controllers/controller');
const User = require('app/models/user');
const PasswordReset = require('app/models/passwordReset');
const uniqueString = require('unique-string');
const { findByIdAndDelete } = require('../../../models/user');



module.exports = new class LoginController extends Controller {

    // Get view informantion login.
    show(req, res) {
        const title = 'فراموشی رمز عبور'
        res.render('home/resetFormResetPassword', {
            captcha: this.recaptcha.render(),           // Show view Recaptcha.
            massage: req.flash('massage'),           // Send validation errors.
            title,
            token: req.params.token
        });
    };


    async resetPasswordProccess(req, res, next) {
        await this.validationRecaptcha(req, res)            // Recaptcha validation.
        let result = await this.validationData(req)

        if (result) {
            return this.resetPassword(req, res);
        } else {
            console.log(req.body)
            return res.redirect('/auth/password/reset/' + req.body.token)
        }
    };


    async resetPassword(req, res) {
        let field = await PasswordReset.findOne({ $and: [{ email: req.body.email }, { token: req.body.token }] })
        if (!field) {
            req.flash('massage', 'اطلاعات وارد شده صحیح نسیت لطفا دقت کنید');
            return this.back(req, res)
        }


        if (field.use) {
            req.flash('massage', 'از این لینک برای بازیابی پسورد استفاده شده است');
            return this.back(req, res);
        }


        let user = await User.findOneAndUpdate({ emial: field.email }, { $set: { password: req.body.password } });
        if (!user) {
            req.flash('massage', 'اپدیت شدن انجام نشد');
            return this.back(req, res);
        }

        await field.updateOne({ use: true });
        return res.redirect('/')
    }
};