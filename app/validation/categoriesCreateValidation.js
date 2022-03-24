const validation = require('app/validation/validation');
const { check } = require('express-validator/check');
const Category = require('./../models/category');
const path = require('path');

module.exports = new class ValidationLogin extends validation {
    handel() {
        return [
            check('name')
            .isLength({ min: 3 })
            .withMessage('نام دسته نمیتواند کم تر از 3 کاراکتر باشد')
            .custom(async(value, { req }) => {
                let category = await Category.findById(req.params.id);
                let getCategory = await Category.findOne({ name: value })




                if (req.query._method === 'put') {
                    if (category.name == value) return
                };

                if (getCategory) {
                    throw new Error('این دسته وجود دارد')
                }
            }),

            check('parent')
            .not().isEmpty()
            .withMessage('پدر دسته را وارد کنید'),
        ]
    };


};