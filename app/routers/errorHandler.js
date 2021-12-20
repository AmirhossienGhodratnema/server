// Require
const express = require('express');
const router = express.Router();

router.all('*', async (req, res, next) => {
    try {
        throw new Error()
    } catch (err) {
        next(err);
    }
});

router.use((err, req, res, next) => {

    let errorMasaage = 'چنین صفحه ای یافت نشد' || '';
    let stack = err.stack || '';

    let layouts = {
        layout: 'error/master',
        extractScripts: false,
        extractStyle: false,
    };s

    res.render('error/stack', { ...layouts });
});


module.exports = router;