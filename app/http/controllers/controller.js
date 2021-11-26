// Require
const autoBind = require('auto-bind');
const { validationResult } = require('express-validator/check');

module.exports = class Controller {
    constructor() {
        autoBind(this);
    };
};