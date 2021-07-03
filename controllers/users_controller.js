

const User = require('../models/user');
//const { User_id } = require('../routes');

// module.exports.profile = function(req,res){
//    if(req.user){
      
      
//       User.findById(req.user.id, function(err, user){ 
//          console.log('user found',user);

//          if(err){
//             console.log('error detecting the user',err);

//          }


//          if(user){
//             return res.render('users',{
//                title:'user profile',
//                user:user
//             });
//          }else{
//             return res.redirect('/users/sign-in');
//          }

//          });
//       }else{
//          return res.redirect('/users/sign-in');
//       }
//    }
module.exports.profile=function(req,res){
   User.findById(req.params.id, function(err, user){
      return res.render('user_profile',{
         title:'User Profile',
         profile_user:user

      });

   });

}

module.exports.update = function(req,res){
   if(req.user.id == req.params.id){
      User.findByIdAndUpdate(req.params.id,req.body, function(err, user){
         return res.redirect('back'); 
      });

   }else{
      return res.status(401).send('Unauthorized');
   }

}

//render the Sign In page
module.exports.signIn = function(req,res){
   if(req.isAuthenticated()){
      return res.redirect('/users/profile');
   }

   return res.render('user_sign_in',{
      title :'Codial | SignIn'
   });
}
//render the Sign Up Page
module.exports.signUp = function(req,res){
   if(req.isAuthenticated()){
      return res.redirect('/users/profile');
   }
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

// ////sign-in and create a session for the user
// module.exports.createSessions= function(req,res){
//    ////steps to authenticate
//    ////find the user
//    User.findOne({email: req.body.email} , function(err, user){
//       if(err){
//            console.log('error in finding the user');
//            return;
//       }
//        ////handle user found
//        if(user){
          
//             ////handle password which doesn't match
//             if(user.password != req.body.password){
//                return res.redirect('back');
//             }

//             ////handle session creation
//             res.cookie('User_id',user.id);
//             return res.redirect('/users/profile');


//        }else{
//             ////handle user not found

//             return res.redirect('back');
//        }

//    });
// }

//sign-in and create a session for the user
module.exports.createSession = function(req, res){
   return res.redirect('/');
}

module.exports.destroySession = function(req,res){
   req.logout();
   
   return res.redirect('/');

}