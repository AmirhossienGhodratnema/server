const passport = require('passport');

module.exports = class Helpers {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    };

    getObjects() {
        // console.log(this.auth.bind(this))
        return {
            auth: this.auth(),
        }
    }

    auth() {
        return {
            check: this.req.isAuthenticated(),
            user: this.req.user,
            text:'Amirhossien',

        }
    }
}