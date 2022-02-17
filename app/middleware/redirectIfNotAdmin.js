const middleware = require("./middleware");
const user = require("app/models/user");

module.exports = new class RedirectIfNotAdmin extends middleware {
  handel(req, res, next) {
    if (req.isAuthenticated() && req.user.admin) return next();
    res.redirect("/");
  }
};
