const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailers');

module.exports.create = async function(req,res){
    try {
        let post = await Post.findById(req.body.post);
        if(post){

            let comment= await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
                post.comments.push(comment);
                post.save();    
                
                comment= await comment.populate('user','name email').execPopulate();
            //calling comments mailer
                commentsMailer.newComment(comment);
                if(req.xhr){
                    return res.status(200).json({
                        data: {
                            comment: comment,
                        },
                        message: "Comment created!"
                    });
                }
        }

        console.log('created comment');
      
        return res.redirect('back');
    } catch (err) {
        console.log('error in creating comment');
        return;
    }
    
    }


module.exports.destroy = async function(req,res){
    let comment= await Comment.findById(req.params.id);
        //.id means converting the object id into string
    let post= await Post.findById(comment.post);

    if(comment.user == req.user.id||post.user==req.user.id){ 
        comment.remove();
        await Post.findByIdAndUpdate(post,{ $pull: {comments: req.param.id}});
    }
    return res.redirect('back');
}
