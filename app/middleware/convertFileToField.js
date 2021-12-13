
const middleware = require('./middleware')

// 
module.exports = new class ConvertFileToField extends middleware {
    handel(req, res, next) {
        if (!req.file) {
            req.body.images = undefined;
        } else {
            req.body.images = req.file.originalname;
        }
        next()
    };
};