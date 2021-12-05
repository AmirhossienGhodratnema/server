const User = require('app/models/user');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

// When Change Page , Stay login
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});





passport.use(new GoogleStrategy({
    clientID: config.recaptcha.google.google_client_key,
    clientSecret: config.recaptcha.google.google_secret_key,
    callbackURL: config.recaptcha.google.google_callback_url
}, function (token, tokenSecret, profile, done) {


    User.findOne({ 'email': profile.emails[0].value }, (err, user) => {
        if (err) throw err;
        if (user) return done(null, user);

        const newUser = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: profile.id
        });

        newUser.save(err => {
            if (err) throw err;
            done(null, newUser);
        })
    })
}
));