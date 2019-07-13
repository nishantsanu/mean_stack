const Post= require('../models/post');
// const passport = require('passport');
const User = require('../models/user');


// module.exports.home=function(req,res){
   
// //populate the user of each post
//     Post.find({})
//     .populate('user')
//     .populate({
//         path: 'comments',
//         populate: {
//             path: 'user'
//         }
//     })
//     .exec(function(err,posts){

//         User.find({},function(err,users){
//             return res.render('home',{
//                 title: "Codeial | Home",
//                 posts: posts,
//                 all_users:users
//             });
//         });

//     })
// }

//ASYNC AWAIT
module.exports.home=  async function(req,res){
    //error handeling by try catch
    try{
        let posts= await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })
        
        let users= await User.find({});

        return res.render('home',{
            title: "Codeial | Home",
            posts: posts,
            all_users:users
        });
    }catch(err){
        console.log('Error',err);
        return;
    }

       
        
    }