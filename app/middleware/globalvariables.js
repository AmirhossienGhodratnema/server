const middleware = require('./middleware');


module.exports = new class GlobalVariables extends middleware {
    // Filter login and registration routes for the user 
    handel(req, res, next) {
        req.locals = {
            errors: req.flash('massage'),
        }
    };
};