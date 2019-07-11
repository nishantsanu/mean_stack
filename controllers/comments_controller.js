const Comment = require('../models/comment');
const Post = require('../models/post');


module.exports.create = function(req,res){

    Post.findById(req.body.post, function(err,post){
        if(post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function(err,comment){
                if(err){console.log('error in creating comment')
                }
                post.comments.push(comment);
                post.save();
                res.redirect('/');
                                     });
            
        }
    });

}

module.exports.destroy = function(req,res){
    Comment.findById(req.params.id,function(err,comment){
        //.id means converting the object id into string
        if(comment.user == req.user.id){
           comment.remove();
           Comment.deleteMany({comment: req.params.id},function(err){
               return res.redirect('back');
           });
       }else{
         return res.redirect('back');
       }

//     Post.findById(comment,function(err,post){

//         if(post.user == req.user.id){
//             comment.remove();
//             Comment.deleteMany({comment: req.params.id},function(err){
//                 return res.redirect('back');
//         });
// }
//     });
    
       
}
    
);
}