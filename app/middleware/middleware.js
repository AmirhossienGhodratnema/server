const autoBind = require("auto-bind");

// Autobind middlewars ( Main Class )
module.exports = class Middleware {
  constructor() {
    autoBind(this);
  }
};
