// Require
const autoBind = require('auto-bind');
const Recaptcha = require('express-recaptcha').Recaptcha;

module.exports = class Controller {
    constructor() {
        autoBind(this);
        this.recaptcha();
    };

    // Show Recaptcha
    recaptcha() {
        this.recaptcha = new Recaptcha('6LeQE2QdAAAAAB7JT9Ys6f3aj-OcLrgPUn0BsJDa', '6LeQE2QdAAAAABMcNv-lUFOqjBnQKNPniuHEv-p6', { 'hl': 'fa' });
    };


    validationRecaptcha(req, res) {
        return new Promise((resolve, reject) => {
            this.recaptcha.verify(req, (err, data) => {
                if (err) {
                    req.flash('massageRegister', 'من رباط نیستم را وارد کنید');
                    res.redirect(req.url)
                } else {
                    resolve(true)
                }
            })
        })
    }



















    // recaptchaVatidation(req, res) {
    //     new Promise((resolve , reject) => {
    //         Recaptcha.verify(req , (err , data) => {
    //             if(err) {
    //                 req.flash('massageRegister', 'من رباط نیستم را وارد کنید');
    //                 res.redirect('/register');
    //             } else {
    //                 resolve(true)
    //             }
    //         })
    //     })
    // }
};