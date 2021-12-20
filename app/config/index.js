const database = require('./database');
const session = require('./session');
const recaptcha = require('./recaptcha');


module.exports = {
    port: process.env.PORT,
    database,
    session,
    cookie_secret: process.env.SECRETKEY_COOKIE,
    recaptcha,
    debuge: false,

}