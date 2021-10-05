const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true                //thiss allows us to set our first argument as request
},
    function (req, email, password, done) {
        //find a user and establish the identity
        User.findOne({ email: email }, function (err, user) {
            if (err) {
                //console.log('error in finding user--> Passport');
                req.flash('error', err);
                return done(err);
            }

            if (!user || user.password != password) {
                //   -- console.log('Invalid Username and Password');
                req.flash('error', 'Invalid Username/Password');
                return done(null, false);
            }
            return done(null, user);

        });

    }
));

//serializing the user to decide which key is to be kept in the cookie\
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

//deserializing the user from the key in the cookie
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if (err) {
            console.log('error in finding user in -->passport');
            return done(null, false);

        }
        return done(null, user);

    });

});

//check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
    //if the user is signed in then pass the request to the next function(controller's action)
    if (req.isAuthenticated()) {
        return next();
    }
    //if user is not signed-in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        //req.user contains the current signed in user from the sessions cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    next();
}


module.exports = passport;