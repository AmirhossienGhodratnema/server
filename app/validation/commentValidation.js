const validation = require('app/validation/validation');
const { check } = require('express-validator/check');
const Course = require('app/models/courses');
const path = require('path');

module.exports = new class CommentValidation extends validation {
    handel() {
        return [
            check('body')
                .isLength({ min: 10 })
                .withMessage('متن کامنت نمیتواند کمتر از 10 کاراکتر باشد'),
        ]
    };
};