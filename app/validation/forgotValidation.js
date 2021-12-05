const validation = require('app/validation/validation');
const { check } = require('express-validator/check');

module.exports = new class ValidationRegister extends validation {
    handel() {
        return [
            check('email')
                .isEmail()
                .withMessage('فرمت ایمیل  به درستی وارد کنید'),
        ]
    };
};