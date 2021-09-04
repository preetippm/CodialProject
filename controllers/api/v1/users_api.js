const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

module.exports.createSession = async function (req, res) {
   try{
       let user = await User.findOne({email: req.body.email});  //finds the user

       if(!user || user.password != req.body.password){
           return res.json(422, {
               message: "Invalid username or password"   // if password doesnot match then return this message
           });
       }

       return res.json(200, {          //if password matches then return the message and also along with the token using the jwt library
           message:"Sign in successful, here is your token , please keep it safe!!",
           data: {
                token: jwt.sign(user.toJSON(), 'codial',{expiresIn: '100000'})  //user.toJSON() is the part that is encrypted and then there is a header and a signature 
           }
       }); 
   }catch(err){
       console.log('********',err);
       return res.json(500, {
           message:"Internal server error"
       });

   }
 }
 