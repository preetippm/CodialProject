const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

//tell passport to use a new startegy for google login
passport.use(new googleStrategy({
    clientID: "819779106938-nbj85g6a46q7hk2fvr5ca2atno60mu19.apps.googleusercontent.com",
    clientSecret: "kWZyQxDnZERZ2nTupyL2Sw8x",
    callbackURL: "http://localhost:8000/users/auth/google/callback"
},

function(accessToken, refreshToken, profile, done){
    //when the call back function is called find the user
    User.findOne({email: profile.emails[0].value}).exec(function(err, user){
        if(err){console.log('error in google strategy-passport',err);
        return;  
    }
    console.log(profile);

    if(user){
        //if found set this user as req.user
        return done(null, user);
    }else{
        //if not found ,create the user and set it as req.user
        User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: crypto.randomBytes(20).toString('hex')
        },function(err, user){
            if(err){console.log('error in creating user google strategy-passport',err);
            
            return;
        }

        return done(null, user);

        });
    }
    })

}

))