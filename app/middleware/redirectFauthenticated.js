const middleware = require('./middleware')

// 
module.exports = new class RedirectFauthentucated extends middleware {
    // Filter login and registration routes for the user 
    handel(req, res, next) {
        if (req.isAuthenticated()) {
            return res.redirect('/')
        }
        next();
    };
};