// Require
const Controller = require('./controller')

module.exports = new class HomeController extends Controller {
    index(req, res) {
        res.render('home');
    };

    loginPage(req, res) {
        res.render('login');
    };

    loginPageGet(req, res) {
        
        this.validationData(req)
            .then(result => {
                if(result) res.json('Register Data')
                else res.render('login')
            })



        // console.log(this.validationData(req)
        //     .then(result => {
        //         console.log(result)
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     }))
    };


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
                    req.flash('massage' , msg)
                return false;
            })
        // password
    }



};