const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const env = require('./environment');

const User = require('../models/user');

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'codial'
    
}

passport.use(new JWTStrategy(opts, function(jwtPayLoad, done){   //we need to tell passport to use jwt
    //stategy ,,..we will pass options and a call back function which reads data from jwt pay load. 
    //Payload contains the information of users

    User.findById(jwtPayLoad._id, function(err, user){    //jwtPayLoad._id contains all the info of user
        if(err){console.log('Error in finding user from JWT'); return;}

        if(user){
            return done(null, user);
        }else{
            return done(null, false);  // false means that the user not found
        }
    });

}));

module.exports = passport;