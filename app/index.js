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
const passport = require('passport');
const rememberLogin = require('app/middleware/rememberlogin');


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
        server.listen(config.port, () => console.log(`Running Server on Port ${config.port} ...`));
    }

    setMongoConnection() {
        mongoose.Promise = global.Promise;
        mongoose.connect(config.database.database_url);
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
        app.use(cookieParser(config.cookie_secret));

        app.use(session({ ...config.session }));
        app.use(flash());

        // after ( cookieParser session bodyParser )
        app.use(passport.initialize());
        app.use(passport.session());

        // RememberLogin Not User login.
        app.use(rememberLogin.handel);

        // Helpers Next Configuration Passport
        app.use((req, res, next) => {
            app.locals = new helpers(req, res).getObjects();            // Send global information.
            next();
        })

    };

    setRouters() {
        app.use(require('./routers'));
    }
}