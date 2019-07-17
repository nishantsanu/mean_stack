//require user from model
const User=require('../models/user');
const Post=require('../models/post');
const Comment=require('../models/comment');
const fs = require('fs');
const path = require('path');

//display profile of user
module.exports.profile=function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render('user_profile',{
            title:'Profile',
            profile_user: user
        });
    });
   
}
//update
module.exports.update = async function(req,res){
    
    if(req.user.id== req.params.id){
    
        try {
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){console.log('****multerError', err)};
                user.name = req.body.name;
                user.email=req.body.email;

                if(req.file){
                    if(user.avatar){
                        try {
                            fs.unlinkSync(path.join(__dirname ,'..',user.avatar));
                        } catch (error) {
                            //do nothing
                        }
                       
                    }

               

                   
                    user.avatar= User.avatarPath +'/'+req.file.filename
                }
                user.save();
                return res.redirect('back');
            })


        } catch (error) {
            req.flash('error',err);
            return res.redirect('back');
        }

    }else{
            req.flash('error','Unauthorized');
            return res.status(401).send('Unauthorized');
        }

}





//render the signin page
module.exports.signin=function(req,res){

    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }
 
    return res.render('user_signin',{
      
        title:'Codeial | Signin'
    });
}
//render the signup page
module.exports.signup=function(req,res){
      if(req.isAuthenticated()){
      return res.redirect('/users/profile');
}

    return res.render('user_signup',{
        title:'Codeial | SignUp'
    });
}
//create data
module.exports.create=function(req,res){
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err){console.log('Error in creating new user'); return;}
        if(!user){
            User.create(req.body,function(err,user){
                if(err){console.log('Error in creating new user while signup');return;}
                return res.redirect('/users/signin');
            })
        }
        else{
            return res.redirect('back');
        }
    })
}



//signin
module.exports.createSession=function(req,res){
    req.flash('success','Logged in Successfully');
    return res.redirect('/');
  
}
//signout
module.exports.destroySession=function(req,res){
    req.logout();
    req.flash('success','You have logged out');

    return res.redirect('/');
}

//delete account

module.exports.destroyAccount= async function(req,res){
try {
        

        let user = await User.findById(req.user.id);   
        console.log(user);
        

        await Post.deleteMany({user: req.user.id});
        console.log('done2');

        await Comment.deleteMany({user: req.user.id});
        user.remove();
        req.logout();
        await Comment.deleteMany({post: req.params.id});        
        return res.redirect('/');



} catch (err) {
    console.log('error in destroying account');
    return res.redirect('back');
}


}

// =======
//FOR signin request
// module.exports.createSession=function(req,res){
//     //step to authenticate
//     //find the user
//     User.findOne({ email:req.body.email},function(err,user){
//         if(err){console.log('Error in signin'); return;}
//         //user found
//         if(user){
//             //handel password which doesnt match
//             if(user.password!=req.body.password){
//                 return res.redirect('back');
//             }
//             //handle session creation
//             res.cookie('user_id',user.id);
//             return res.redirect('/users/profile');

//         }
//         else{
//             //handel user not found
//             return res.redirect('back');
//         }
//     });


// >>>>>>> origin
// }