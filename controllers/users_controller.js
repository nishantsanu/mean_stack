//require user from model
const User=require('../models/user');

module.exports.profile=function(req,res){
    
    return res.render('user_profile',{
        title:'Profile'
    });
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
// <<<<<<< HEAD


//signin
module.exports.createSession=function(req,res){
    return res.redirect('/');
  
}
//signout
module.exports.destroySession=function(req,res){
    req.logout();

    return res.redirect('/');
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