

const User = require('../models/user');
const fs = require('fs');
const path = require('path');
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
module.exports.profile = function (req, res) {
   User.findById(req.params.id, function (err, user) {
      return res.render('user_profile', {
         title: 'User Profile',
         profile_user: user

      });

   });

}

module.exports.update = async function (req, res) {
   // if (req.user.id == req.params.id) {
   //    User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
   //       req.flash('success', 'Updated!');
   //       return res.redirect('back');
   //    });

   // } else {
   //    req.flash('error', 'Unauthorized!');
   //    return res.status(401).send('Unauthorized');
   // }

      if(req.user.id == req.params.id){

         try{
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err){
               if(err){console.log('******Multer error:',err)}

               //console.log(req.file);

               user.name= req.body.name;
               user.email= req.body.email;

               if(req.file){

                  if(user.avatar){
                     fs.unlinkSync(path.join(__dirname, '..',user.avatar));

                  }

               //this is saving the path of the uploaded file into the avatar feild in the user
                   user.avatar =  User.avatarPath + '/' + req.file.filename;  
                  
                  }
                  user.save();
                  return res.redirect('back');
               

            });

        } catch(err){
            req.flash('error',err);
            return res.redirect('back');
         }

      }else{
         req.flash('error', 'Unauthorized!');
         return res.status(401).send('Unauthorized');

      }

}

//render the Sign In page
module.exports.signIn = function (req, res) {
   if (req.isAuthenticated()) {
      return res.redirect('/users/profile');
   }

   return res.render('user_sign_in', {
      title: 'Codial | SignIn'
   });
}
//render the Sign Up Page
module.exports.signUp = function (req, res) {
   if (req.isAuthenticated()) {
      return res.redirect('/users/profile');
   }
   return res.render('user_sign_up', {
      title: 'Codial | SignUp'
   });

}

// //get the sign up data
module.exports.create = function (req, res) {
   if (req.body.password != req.body.confirm_password) {
      return res.redirect('back');
   }
   User.findOne({ email: req.body.email }, function (err, user) {


      if (err) {
         //console.log('error in finding user in signing up');
         if (err) { req.flash('error', err); return }
      }

      if (!user) {
         User.create(req.body, function (err, user) {
            // if(err){console.log('error in creating user while signing up');
            if (err) { req.flash('error', err); return }
            return res.redirect('/users/sign-in');
         })


      } else {
         req.flash('success', 'You have signed up, login to continue!');
         return res.redirect('back');
      }

   })

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
module.exports.createSession = function (req, res) {
   req.flash('success', 'Logged in successfully');
   return res.redirect('/');
}

module.exports.destroySession = function (req, res) {
   req.logout();
   req.flash('success', 'Logged out successfully!');
   return res.redirect('/');

}