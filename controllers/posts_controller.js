const Post=require('../models/post');
const User=require('../models/user');
const Comment = require('../models/comment');

module.exports.create = async function(req,res){
    try {
        let post= await Post.create({
            content : req.body.content,
            user:req.user._id,
        })
          return res.redirect('back');
    } catch (err) {
        if(err){
            console.log('error in creating post');
            return;
        }
    }
   
     }
 

 module.exports.destroy = async function(req,res){
    try {
        let post = await Post.findById(req.params.id);
         if(post.user == req.user.id){
            post.remove();
            await Comment.deleteMany({post: req.params.id});
            return res.redirect('back');
        }else{
                return res.redirect('back');
            }
    } catch (err) {
        console.log('error in deleting post');
    }
     
  }