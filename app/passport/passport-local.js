const localStrategy = require('passport-local');
const User = require('app/models/user');
const passport = require('passport');

// When Change Page , Stay login
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use('local.register', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    User.findOne({ 'email': email }, (err, user) => {
        console.log(err, user)
    })
}))


