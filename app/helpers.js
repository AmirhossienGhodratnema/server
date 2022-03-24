const autoBind = require('auto-bind')
const path = require('path');
var moment = require('moment-jalaali');
// const { realpathSync } = require('fs');
module.exports = class Helpers {
    constructor(req, res) {
        autoBind(this);
        this.req = req;
        this.res = res;
        this.formData = this.req.flash('formData')[0];


    };


    getObjects() {
        return {
            auth: this.auth(),
            viewPath: this.viewPath,
            ...this.getObjectVariables(),
            old: this.old,
            date: this.date,
            req: this.req,
        };
    };


    auth() {
        return {
            check: this.req.isAuthenticated(),
            user: this.req.user,
        };
    };


    viewPath(dir) {
        return path.join(__dirname + '/' + dir)
    };


    getObjectVariables() {
        return {
            massage: this.req.flash('massage')
        };
    };



    old(field, defultValue = '') {
        return this.formData && this.formData.hasOwnProperty(field) ? this.formData[field] : defultValue;
    };


    date(DT) {
        return moment(DT);
    }

};