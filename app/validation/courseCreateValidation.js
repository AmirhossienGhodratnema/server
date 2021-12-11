const validation = require('app/validation/validation');
const { check } = require('express-validator/check');

module.exports = new class ValidationLogin extends validation {
    handel() {
        return [

            check('name')
                .isLength({ min: 8 })
                .withMessage('عنوان نمیتواند کم تر از  کاراکتر باشد'),

            check('type')
                .not().isEmpty()
                .withMessage('نوع دوره نمیتواند خالی بماند'),

            check('price')
                .not().isEmpty()
                .withMessage('قیمت نمیتواند خالی بماند'),

            check('tags')
                .not().isEmpty()
                .withMessage('تگ را وارد کنید'),
        ]
    };
};