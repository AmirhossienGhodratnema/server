const MongoStore = require('connect-mongo');


module.exports = {
    secret: 'mysecretkey',
    resave: true,
    saveUninitialized: true,
    cookie: { expires: new Date(Date.now() + 1000 * 60 * 60 * 4) },
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/application',
    })
}