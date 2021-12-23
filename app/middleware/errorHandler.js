const middleware = require('./middleware');


module.exports = new class GlobalVariables extends middleware {
    async error404(req, res, next) {
        try {
            res.statusCode = 404
            throw new Error('چنین صفحه ای وجود ندارد')
        } catch (err) {
            next(err);
        }
    }

    async handler(err, req, res, next) {
        let statusCode = res.statusCode || 500;
        let errorMasaage = err.message || '';
        let stack = err.stack || '';

        let layouts = {
            layout: 'error/master',
            extractScripts: false,
            extractStyle: false,
        };

        if (config.debuge) return res.render('error/stack', { ...layouts, errorMasaage, stack });

        res.render(`error/${statusCode}`, { ...layouts, errorMasaage, stack });
    }
};