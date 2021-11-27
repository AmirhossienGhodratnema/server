// Require
const Controller = require('./controller')

module.exports = new class HomeController extends Controller {
    // Home Page MT=Get
    index(req, res) {
        res.render('home');
    };

    // MT=Get
    loginPage(req, res) {
        res.render('login' , {
            massage : req.flash('massage')
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