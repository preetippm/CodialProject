const Post = require('../../../models/post');
const Comment = require('../../../models/comment');    //importing the comment model , comment schema

module.exports.index = async function(req , res){

    let posts = await Post.find({})
    .sort('-createdAt')                  //-------------1--await
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    });

    return res.json(200,{
        message:"List of posts for version 1",
        posts: posts
    
    })
}


module.exports.destroy = async function (req, res) {
    try{
        let post =await Post.findById(req.params.id);             //find out the post

        //.id means converting the object id into string
        //if (post.user == req.user.id) {
            post.remove();                                        //delete the post

            await Comment.deleteMany({ post: req.params.id });    //delete the comment



            
            return res.json(200, {
                message:"post and associated comments deleted successfully!!"
            });

        // } else {
        //     return res.redirect('back');
        // }

    }catch(err){
        console.log('*********',err);
        return res.json(500,{
            message:"internal server error"
        });
    }
}
