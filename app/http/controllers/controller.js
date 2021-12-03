// Require
const autoBind = require('auto-bind');
const Recaptcha = require('express-recaptcha').Recaptcha;

module.exports = class Controller {
    constructor() {
        autoBind(this);         // Automatic binding for inherited classes.
        this.recaptcha();           // Start-up recaptcha.
    };


    // Recaptcha sampling  
    recaptcha() {
        this.recaptcha = new Recaptcha(config.recaptcha.site_key, config.recaptcha.secret_key, config.recaptcha.options);
    };


    // Start-up recaptcha. 
    validationRecaptcha(req, res) {
        return new Promise((resolve, reject) => {
            this.recaptcha.verify(req, (err, data) => {
                if (err) {
                    req.flash('massage', 'من رباط نیستم را وارد کنید');
                    res.redirect(req.url)
                } else {
                    resolve(true)
                };
            });
        });
    };
};