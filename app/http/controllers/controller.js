// Require
const autoBind = require('auto-bind');
const Recaptcha = require('express-recaptcha').Recaptcha;
const { validationResult } = require('express-validator/check')
const isMongoId = require('validator/lib/isMongoId')
const sprintf = require('sprintf-js').sprintf;

module.exports = class Controller {


    constructor() {
        autoBind(this);         // Automatic binding for inherited classes.
        this.recaptcha();           // Start-up recaptcha.

    };

    // Recaptcha sampling  
    recaptcha() {
        // test
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

    isMongoId(paramsId) {
        if (!isMongoId(paramsId)) {
            throw new Error('چنین آیدی وجود ندارد')
        }
    }

    error(message, status = 500) {
        let err = new Error(message);
        err.status = status;
        throw err
    }

    async getTime(episode) {
        let second = 0;
        await episode.forEach(item => {
            let splitList = item.time.split(':')
            if (splitList.length == 2) {
                second += parseInt(splitList[0]) * 60;
                second += parseInt(splitList[1]);
            } else if (splitList.length == 3) {
                second += parseInt(splitList[0]) * 3600;
                second += parseInt(splitList[1]) * 60;
                second += parseInt(splitList[2]);
            }
        })
        let hours = Math.floor(second / 60 / 60);
        let minuts = Math.floor((second / 60 / 60) % 1 * 60)
        let secend = Math.floor(((second / 60 / 60) % 1 * 60) % 1 * 60)

        return sprintf('%02d:%02d:%02d', hours, minuts, secend)

    }
};