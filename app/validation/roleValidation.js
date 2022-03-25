const validation = require('app/validation/validation');
const { check } = require('express-validator/check');
const Role = require('./../models/role');
const path = require('path');

module.exports = new class ValidationPermission extends validation {
    handel() {
        return [
            check('name')
                .isLength({ min: 3 })
                .withMessage('نام اجازه دسترسی نمیتواند کم تر از 3 کاراکتر باشد')
                .custom(async (value, { req }) => {
                    let role = await Role.findById(req.params.id);
                    let getRole = await Role.findOne({ name: value })
                    console.log('value' , value);
                    // console.log('getpermission' , getpermission);
                    console.log('req.query._method ' , req.query._method );

                    if (req.query._method === 'put') {
                        if (role.name == value) return
                    };

                    if (getRole) {
                        throw new Error('این اجازه دسترسی وجود دارد')
                    };
                }),

            check('lable')
                .not().isEmpty()
                .withMessage('توضیح نمیتواند خالی باشد'),

            check('permission')
                .not().isEmpty()
                .withMessage('اجازه دسترسی نمیتواند خالی باشید'),
        ]
    };


};