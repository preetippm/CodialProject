const Post = require('../models/post');

const User = require('../models/user');

module.exports.home = function(req,res){
    // console.log(req.cookies);
    // // res.cookie('User_id',238940);

    // Post.find({},function(err,posts){
    //     return res.render('home',{
    //         title: 'Codial | Home',
    //         posts:posts
    // })
    
    // });

    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })
     .exec(function(err,posts){

        User.find({}, function(err, users){
            return res.render('home',{
                title: 'Codial | Home',
                posts:posts,
                all_users:users
        });      
    });
})

// Post.find({}).populate('comment').exec(function(err,posts){
//     return res.render('home',{
//                 title: 'Codial | Home',
//                 posts:posts
// });

// })
}