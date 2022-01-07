const validation = require('app/validation/validation');
const { check } = require('express-validator/check');
const path = require('path');

module.exports = new class EpisodeValidation extends validation {
    handel() {
        return [
            check('title')
                .isLength({ min: 5 })
                .withMessage('عنوان نمیتواند کم تر از 5 کاراکتر باشد'),

            check('body')
                .isLength({ min: 20 })
                .withMessage('متن دوره نمیتواند کمتر از 20 کاراکتر باشد'),


            check('videoUrl')
                .not().isEmpty()
                .withMessage('آدرس ویدیو الزامی است'),

            check('time')
                .not().isEmpty()
                .withMessage('زمان را وارد کنید'),

            check('number')
                .not().isEmpty()
                .withMessage('عدد دوره را وارد کنید'),

            check('type')
                .not().isEmpty()
                .withMessage('نوع دوره نمیتواند خالی بماند'),
        ]
    };
};