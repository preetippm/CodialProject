

const User = require('../models/user');

module.exports.profile = function(req,res){
   return res.render('users',{
      title:'users'
   });
}

//render the Sign In page
module.exports.signIn = function(req,res){
   return res.render('user_sign_in',{
      title :'Codial | SignIn'
   });
}
//render the Sign Up Page
module.exports.signUp = function(req,res){
   return res.render('user_sign_up',{
      title: 'Codial | SignUp'
   });

}

// //get the sign up data
module.exports.create = function(req,res){
   if(req.body.password != req.body.confirm_password){
      return res.redirect('back');
   }
   User.findOne({email: req.body.email},function(err,user){
      if(err){
         console.log('error in finding user in signing up');
      }
      
      if(!user){
         User.create(req.body, function(err, user){
            if(err){console.log('error in creating user while signing up');
            return;         
         }
         return res.redirect('/users/sign-in');
             })
           }else{
            return res.redirect('back');

           }

       });

    }

//sign-in and create a session for the user
module.exports.createSessions= function(req,res){
   

}