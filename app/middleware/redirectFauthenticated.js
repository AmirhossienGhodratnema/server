const middleware = require('./middleware')

module.exports = class RedirectFauthentucated extends middleware {
    handel(req, res, next) {
        if (req.isAuthenticated()) {
            return req.redirect('/')
        }
        next();
    };
};