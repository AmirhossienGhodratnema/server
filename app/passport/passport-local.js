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


// Strategy Register
passport.use('local.register', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    User.findOne({ 'email': email }, (err, user) => {
        if (err) return done(err);
        if (user) return done(null, false, req.flash('massage', 'اطلاعات وارد شده وجود دارد'))

        const newUser = new User({
            name: req.body.name,
            email,
            password,
        })

        newUser.save(err => {
            if (err) return done(null, false, req.flash('massage', 'عملیات ناموفق بود دوباره امتحان کنید'))
            done(null, newUser);
        });
    });
}));


// Strategy Login
passport.use('local.login', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    User.findOne({ 'email': email }, (err, user) => {
        if (err) return done(err);
        
        if (!user || !user.comparePassword(password)) {
            return done(null, false, req.flash('massage', 'اطلاعات وارد شده مطابقت ندارد'))
        };

        done(null, user);
    });
}));



