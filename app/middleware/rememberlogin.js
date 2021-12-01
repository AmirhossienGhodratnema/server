const middleware = require('./middleware')
const user = require('app/models/user');


module.exports = class RememberLogin extends middleware {
    handel(req, res, next) {
        if (!user.isAuthenticated()) {
            const rememberToken = req.signedCookies.remember_token;
            if (rememberToken) return this.userFind(req, res, next);
        };
        next();
    };

    userFind(req, res, next) {
        if (user) {
            user.findOne({ rememberToken })
                .then(user => {
                    req.login(user, err => {
                        if (err) next(err);
                        next();
                    })
                })
                .catch(err => next(err))
        };
    };

};