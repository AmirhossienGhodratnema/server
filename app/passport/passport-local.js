const passPort = require('passport');
const localStrategy = require('passport-local');

// When Change Page , Stay login
// passport.serializeUser(function (user, done) {
//     done(null, user.id);
// });
// passport.deserializeUser(function (id, done) {
//     User.findById(id, function (err, user) {
//         done(err, user);
//     });
// });

