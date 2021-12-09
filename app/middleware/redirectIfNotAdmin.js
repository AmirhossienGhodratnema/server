const middleware = require('./middleware')
const user = require('app/models/user');


module.exports = new class RedirectIfNotAdmin extends middleware {
    handel(req, res, next) {
        console.log('Amirhossien');
        next();
    };

};