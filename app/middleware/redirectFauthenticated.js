const middleware = require('./middleware')

module.exports = new class RedirectFauthentucated extends middleware {
    handel(req, res, next) {
        if (req.isAuthenticated()) {
            return res.redirect('/')
        }
        next();
    };
};