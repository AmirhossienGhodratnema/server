const middleware = require('./middleware')
const user = require('app/models/user');


module.exports = new class RememberLogin extends middleware {
    handel(req, res, next) {
        if (!req.isAuthenticated()) {
            const rememberToken = req.signedCookies.remember_token;
            if (rememberToken) return this.userFind(req, res, next);
        };
        next();
    };

    userFind(req, res, next) {
        if (user) {
            // console.log('Amirhossine');
            // next()
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