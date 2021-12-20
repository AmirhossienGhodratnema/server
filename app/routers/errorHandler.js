// Require
const express = require('express');
const router = express.Router();

router.all('*', async (req, res, next) => {
    try {
        res.statusCode = 404
        throw new Error()
    } catch (err) {
        next(err);
    }
});

router.use((err, req, res, next) => {

    let statusCode = res.statusCode || 500;
    let errorMasaage = 'چنین صفحه ای یافت نشد' || '';
    let stack = err.stack || '';

    let layouts = {
        layout: 'error/master',
        extractScripts: false,
        extractStyle: false,
    };

    console.log('statusCode :', statusCode)
    if (config.debuge) res.render('error/stack', { ...layouts, errorMasaage, stack });

    res.render(`error/${statusCode}`, { ...layouts, errorMasaage, stack });
});


module.exports = router;