// Require
const Controller = require('app/http/controllers/controller');
const passport = require('passport');

module.exports = new class LoginController extends Controller {

    // Get view informantion login.
    loginPage(req, res) {
        try {
            const title = 'ورود'
            res.render('home/login', {
                captcha: this.recaptcha.render(),           // Show view Recaptcha.
                title,
            });

        } catch (err) {
            next(err)
        }
    };


    // Send information login.
    loginPagePost(req, res, next) {
        try {
            this.validationRecaptcha(req, res)
                .then(result => this.validationData(req))
                .then(result => {
                    if (result) this.login(req, res, next)
                    else {
                        req.flash('formData', req.body);
                        res.redirect('/auth/login');
                    }
                })
            this.login(req, res ,next)
        } catch (err) {
            next(err)
        }
    };


    //  User login authentication.
    login(req, res, next) {
        try {
            passport.authenticate('local.login', (err, user) => {
                if (!user) return res.redirect('/login');
                req.login(user, err => {
                    if (req.body.remember) {
                        user.setrememberToken(res);         // Register token for user.
                        res.redirect('/')
                    } else {
                        return res.redirect('/')
                    }
                })

            })(req, res, next);
        } catch (err) {
            next(err)
        }
    };
};