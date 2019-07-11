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
            //save its post id
            let postId = comment.post;  
           comment.remove();
           Post.findByIdAndUpdate(postId,{ $pull: {comments: req.param.id}},function(err,post){
               return res.redirect('back');
           })   
       }
       else{
         return res.redirect ('back');
       }

       
}
    
);
}

// module.exports.destroy = function(req,res){
//     Comment.findById(req.params.id,function(err,comment){
//         //.id means converting the object id into string
        
//         if(comment.user == req.user.id){
//             //save its post id
//             let postId = comment.post;  
//            comment.remove();
//            Post.findByIdAndUpdate(postId,{ $pull: {comments: req.param.id}},function(err,post){
//                console.log('1');
//                return res.redirect('back');
//            })
//            return res.redirect('back');
//            console.log('2');
//        }
//        Post.findById(comment.post,function(err,post){
//         //.id means converting the object id into string
//         console.log('3');
//         if(post.user == req.user.id){
//             //save its post id
//             let postId = comment.post;  
//            comment.remove();
//            Post.findByIdAndUpdate(postId,{ $pull: {comments: req.param.id}},function(err,post){
//                return res.redirect('back');
//            })
          
//        }
//        else{
//            return res.redirect('back');
//        }
       


// });
// console.log('4');

// return res.redirect('back');

// });
// }