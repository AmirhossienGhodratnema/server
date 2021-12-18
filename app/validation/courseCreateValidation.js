const validation = require('app/validation/validation');
const { check } = require('express-validator/check');
const Course = require('app/models/courses');
const path = require('path');

module.exports = new class ValidationLogin extends validation {
    handel() {
        return [

            check('title')
                .isLength({ min: 5 })
                .withMessage('عنوان نمیتواند کم تر از 5 کاراکتر باشد')
                .custom(async value => {
                    let course = Course.findOne({ slug: this.slug(value) });
                    console.log('value', value)

                    if (!course) {
                        throw new Error('این اسلاگ وجود دارد')
                    }
                }),

            check('images')
                .custom(async value => {
                    if (!value) throw new Error('وارد کردن عکس الزامی است');

                    let fileExt = ['.png', '.jpg', '.jpeg', '.svg'];
                    if (!fileExt.includes(path.extname(value))) throw new Error('فرمت فایل وارد شده عکس نیست')
                }),

            check('body')
                .isLength({ min: 20 })
                .withMessage('متن دوره نمیتواند کمتر از 20 کاراکتر باشد'),

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

    slug(title) {
        return title.replace(/([^۰-۹آ-یa-z0-9]|-)+/g, "-")
    }
};