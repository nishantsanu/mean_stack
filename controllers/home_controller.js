const Post= require('../models/post');
const passport = require('passport');

module.exports.home=function(req,res){
   // console.log(req.cookies);

//     Post.find({},function(err,posts){
//     if(err){
//         console.log('error in fetching posts from db');
//         return;
//     }
//     return res.render('home',{
//         title:'Home',
//         users_posts : posts
//     })
//    })

//populate the user of each post
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err,posts){
        return res.render('home',{
            title: "Codeial | Home",
            posts: posts
        });
    })
}