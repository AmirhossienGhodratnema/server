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
        mongoose.connect('mongodb://localhost/nodejsCMS');
    }

    // Module Config.
    configuration() {
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        
        app.use(express.static('public'));

        app.set('view engin', 'ejs');
        app.set('views', path.resolve('./resourse/views'));

        app.use(validator());

        app.use(session({
            secret: 'mysecretkey',
            resave: true,
            saveUninitialized: true,
            store: MongoStore.create({
                mongoUrl: 'mongodb://localhost/test-app',
            })
        }));
        app.use(cookieParser('mysecretkey'));
        app.use(flash());
    };

    setRouters() {
        app.use(require('./routers'));
    }
}