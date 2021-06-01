

const User = require('../models/user');
// const { User_id } = require('../routes');

module.exports.profile = function(req,res){
   if(req.cookies.User_id){
      User.findById(req.cookies.User_id, function(err, user){ 
         if(user){
            return res.render('users',{
               title:'user profile',
               user:user
            });
         }else{
            return res.redirect('/user/sign-in');
         }

         });
      }else{
         return res.redirect('/user/sign-in');
      }
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