const Post = require('../models/post');

module.exports.home = function(req,res){
    // console.log(req.cookies);
    // // res.cookie('User_id',238940);

    // Post.find({},function(err,posts){
    //     return res.render('home',{
    //         title: 'Codial | Home',
    //         posts:posts
    // })
    
    // });

    Post.find({}).populate('user').exec(function(err,posts){
        return res.render('home',{
                    title: 'Codial | Home',
                    posts:posts
    });

})
}