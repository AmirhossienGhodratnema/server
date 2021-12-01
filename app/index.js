const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const validator = require('express-validator')
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');


// Require Files
const helpers = require('./helpers');


module.exports = class Aplication {
    constructor() {
        this.setupExpress();
        this.setMongoConnection();
        this.configuration();
        this.setRouters();


    };

    // Express Config.
    setupExpress() {
        const server = http.createServer(app);
        server.listen(3000, () => console.log('Running Server on Port 3000 ...'));
    }

    setMongoConnection() {
        mongoose.Promise = global.Promise;
        mongoose.connect('mongodb://localhost/application');
    }

    // Module Config.
    configuration() {
        require('app/passport/passport-local');

        app.set('view engine', 'ejs');
        app.set('views', path.join(__dirname, '/resourse/views'));

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));

        app.use(express.static(path.join(__dirname, 'public')));

        app.use(validator());
        app.use(cookieParser('mysecretkey'));

        app.use(session({
            secret: 'mysecretkey',
            resave: true,
            saveUninitialized: true,
            cookie: { expires: new Date(Date.now() + 1000 * 60 * 60 * 4) },
            store: MongoStore.create({
                mongoUrl: 'mongodb://localhost/application',
            })
        }));
        app.use(flash());

        // after ( cookieParser session bodyParser )
        app.use(passport.initialize());
        app.use(passport.session());

        // Helpers Next Configuration Passport
        app.use((req, res, next) => {
            app.locals = new helpers(req, res).getObjects();
            next();

        })

    };

    setRouters() {
        app.use(require('./routers'));
    }
}