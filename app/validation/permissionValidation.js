const validation = require('app/validation/validation');
const { check } = require('express-validator/check');
const Permission = require('./../models/permission');
const path = require('path');

module.exports = new class ValidationPermission extends validation {
    handel() {
        return [
            check('name')
                .isLength({ min: 3 })
                .withMessage('نام اجازه دسترسی نمیتواند کم تر از 3 کاراکتر باشد')
                .custom(async (value, { req }) => {
                    let permission = await Permission.findById(req.params.id);
                    let getpermission = await Permission.findOne({ name: value })

                    if (req.query._method === 'put') {
                        if (permission.name == value) return
                    };

                    if (getpermission) {
                        throw new Error('این اجازه دسترسی وجود دارد')
                    };
                }),

            check('lable')
                .not().isEmpty()
                .withMessage('عنوان اجازه دسترسی را وارد کنید'),
        ]
    };


};