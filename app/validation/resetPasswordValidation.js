const validation = require('app/validation/validation');
const { check } = require('express-validator/check');

module.exports = new class ValidationRegister extends validation {
    handel() {
        return [
            check('email')
                .isEmail()
                .withMessage('فرمت ایمیل  به درستی وارد کنید'),

            check('token')
                .not().isEmpty()
                .withMessage('فیلد توکن الزامی است'),

            check('password')
                .isLength({ min: 8 })
                .withMessage('پسورد نمیتواند کم تر از 8 کاراکتر باشد'),
        ]
    };
};