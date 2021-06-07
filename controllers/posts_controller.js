const Post = require('../models/post');

module.exports.create = function(req,res){
    Post.create({
        content : req.body.content,   //schema name : form content //textArea
        user:req.user
    },function(err,post){
        if(err){
            console.log('error is creating the post');
            return;
          }
          return res.redirect('back');

    });

}