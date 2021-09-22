const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');

// module.exports.create = function (req, res) {
//     Post.create({
//         content: req.body.content,   //schema name : form content //textArea
//         user: req.user._id
//     }, function (err, post) {
//         if (err) {
//             console.log('error is creating the post');
//             return;
//         }
//         return res.redirect('back');

//     });

// }

// module.exports.destroy = function (req, res) {
//     Post.findById(req.params.id, function (err, post) {
//         //.id means converting the object id into string
//         if (post.user == req.user.id) {
//             post.remove();

//             Comment.deleteMany({ post: req.params.id }, function (err) {
//                 return res.redirect('back');
//             });

//         } else {
//             return res.redirect('back');
//         }
//     });

// }

module.exports.create =async function (req, res) {
    try{
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
            if(req.xhr){
                return res.status(200).json({
                    data: {
                        post: post

                    },
                    message :"Post created!"
                });

            }
            req.flash('success','Post published!');
            return res.redirect('back');

    }catch(err){
        console.log('Error',err);
        return;
    }
    }


module.exports.destroy = async function (req, res) {
    try{
        let post =await Post.findById(req.params.id);

        //.id means converting the object id into string
        if (post.user == req.user.id) {

            // CHANGE:: delete the associated likes for the post and all its comment's likes too
            await Like.deleteMany({likeable:post, onModle:'Post'});
            await Like.deleteMany({_id: {$in: post.comments}});

            
            post.remove();

            await Comment.deleteMany({ post: req.params.id });

            if(req.xhr){
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post deleted!"
                })


            }
            return res.redirect('back');

        } else {
            return res.redirect('back');
        }

    }catch(err){
        console.log('Error',err);
        return;
    }
}

