const autoBind = require('auto-bind');

module.exports = class Validation {
    constructor() {
        autoBind(this)
    };
};