// Require
const Controller = require('./controller')
var Recaptcha = require('express-recaptcha').Recaptcha;


module.exports = new class HomeController extends Controller {
    // Home Page MT=Get
    index(req, res) {
        res.render('home');
    };

    // MT=Get
    loginPage(req, res) {
        res.render('login', {
            massage: req.flash('massage')
        });
    };



    // MT=Post
    loginPagePost(req, res) {
        this.validationData(req)
            .then(result => {
                if (result) res.json('Register Data')
                else {
                    res.redirect('/login')

                }

            });

    };

    registerData(req, res) {
        const recaptcha = new Recaptcha('6LeQE2QdAAAAAB7JT9Ys6f3aj-OcLrgPUn0BsJDa', '6LeQE2QdAAAAABMcNv-lUFOqjBnQKNPniuHEv-p6', { 'hl': 'fa' });
        res.render('register', {
            captcha: recaptcha.render(),
            massageRegister: req.flash('massageRegister'),
        })

    }

    registerDataPost(req, res) {


        this.validationDataRegister(req)
            .then(result => {
                if (result) {
                    res.json('Create Acc');
                } else {
                    res.redirect('register');
                }

            });
    };

    validationDataRegister(req) {
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
                if (errors.length == 0) {
                    return true;
                } else {
                    req.flash('massageRegister', msg)
                    return false;
                }
            })
    }

    // Validation Data Method
    validationData(req) {
        req.checkBody('name', 'نام کاربری یا ایمیل خود را وارد کنید').notEmpty()
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
};