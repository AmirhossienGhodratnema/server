
const autoBind = require('auto-bind')
const path = require('path');
module.exports = class Helpers {
    constructor(req, res) {
        autoBind(this);
        this.req = req;
        this.res = res;
    };


    getObjects() {
        return {
            auth: this.auth(),
            viewPath: this.viewPath,
            ...this.getObjectVariables(),
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
        }
    }
};