//const { models } = require('mongoose');
const Comment = require('../models/comment'); 

const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_worker');
const Like = require('../models/like');

// module.exports.create = function(req,res){

//     Post.findById(req.body.post,function(err,post){
//         if(post){
//             Comment.create({
//                 content:req.body.content,
//                 post:req.body.post,
//                 user:req.user._id
//             },function(err,comment){
//                 //handle error
//                 if(err){
//                     console.log('getting error ', err);

//                 }else{


//                 post.comments.push(comment);
//                 post.save();

//                 res.redirect('/');
//                 }

//             });
//         }


//     });
// }

// module.exports.destroy = function(req,res){
//     Comment.findById(req.params.id, function(err, comment){
//         if(comment.user == req.user.id){
//             let postId = comment.post;
//             comment.remove();
//             Post.findByIdAndUpdate(postId, {$pull:{comments:req.params.id}},function(err,post){
//                 return res.redirect('back');
//             })

//         }else{
//             return res.redirect('back');
//         }

//     });

// }

module.exports.create =async function(req,res){

    try{
        let post = await Post.findById(req.body.post);

        if(post){
            let comment = await Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            });
            post.comments.push(comment);
            post.save();

            comment = await comment.populate('user','name email').execPopulate();
            //commentsMailer.newComment(comment);
            let job = queue.create('emails',comment).save(function(err){
                if(err){
                    console.log('error in sending to the queue',err);
                    return;
                }
                console.log('job enqueued',job.id);
            });

            if(req.xhr){

                //similar for comments to fetch the user's id
                return res.status(200).json({
                    data: {
                        comment:comment
                    },
                    message: "Post created!"
                

                });

            }

            req.flash('success', 'comment published!');

            return res.redirect('/');
        }

    }catch(err){
        Console.log('Error',err);
        return;
    }    
}


module.exports.destroy = async function(req,res){

    try{
        let comment = await Comment.findById(req.params.id);
        if(comment.user == req.user.id){
            let postId = comment.post;
            comment.remove();
            let post = await Post.findByIdAndUpdate(postId, {$pull:{comments:req.params.id}});

            //CHANGE:: destroy the associated likes for this comment
            await Like.deleteMany({likeable:comment._id, onModle:'Comment'});
            
                return res.redirect('back');

            }else{
            return res.redirect('back');
        }
    }catch(err){
        Console.log('Error',err);
    } 

}