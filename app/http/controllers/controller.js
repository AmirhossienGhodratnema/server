// Require
const autoBind = require('auto-bind');
const Recaptcha = require('express-recaptcha').Recaptcha;
const { validationResult } = require('express-validator/check')


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
                    this.back(req, res)
                } else {
                    resolve(true)
                };
            });
        });
    };


    // Validation of input information.
    async validationData(req) {
        const result = validationResult(req);

        if (!result.isEmpty()) {
            const errors = result.array();
            const msg = [];

            errors.forEach(item => msg.push(item.msg));

            req.flash('massage', msg);
            return false;
        }
        return true;
    };

    back(req, res) {
        req.flash('formData', req.body)
        return res.redirect(req.headers.referer || '/')
    }
};