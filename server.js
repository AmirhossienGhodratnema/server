require('app-module-path').addPath(__dirname);

const App = require('./app');
require('dotenv').config()
global.config = require('./app/config');

new App();
