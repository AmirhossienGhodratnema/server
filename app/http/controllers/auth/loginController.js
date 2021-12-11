// Require
const Controller = require('app/http/controllers/controller');
const passport = require('passport');

module.exports = new class LoginController extends Controller {

    // Get view informantion login.
    loginPage(req, res) {
        const title = 'ورود'
        res.render('home/login', {
            captcha: this.recaptcha.render(),           // Show view Recaptcha.
            title,
        });
    };


    // Send information login.
    loginPagePost(req, res, next) {
        this.validationRecaptcha(req, res)          // Recaptcha validation.
            .then(result => this.validationData(req))
            .then(result => {
                if (result) this.login(req, res, next)
                else {
                    res.redirect('/auth/login')
                }
            })
    };


    //  User login authentication.
    login(req, res, next) {
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
    };
};