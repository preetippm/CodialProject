const Post = require('../models/post');

const User = require('../models/user');

module.exports.home =  async function(req,res){
   
    try{ 
        //populate the user of each post
    let posts = await Post.find({})
    .sort('-createdAt')                  //-------------1--await
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    });
     let users = await User.find({});               //--------------2--await


        return res.render('home',{
            title: 'Codial | Home',                 //---------------returns the data to the browser
            posts:posts,
            all_users:users     
    });


   } catch(err){
       console.log('Error ',err);                   //----------------if there is any error
       return;

   }
}