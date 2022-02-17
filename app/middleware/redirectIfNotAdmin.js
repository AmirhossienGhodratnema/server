const middleware = require("./middleware");
const user = require("app/models/user");

module.exports = new (class RedirectIfNotAdmin extends middleware {
  handel(req, res, next) {
    console.log("req.isAuthenticated()", req.isAuthenticated());
    console.log("req.user.admin", req.user.admin);

    if (req.isAuthenticated() && req.user.admin) return next();
    res.redirect("/");
  }
})();
