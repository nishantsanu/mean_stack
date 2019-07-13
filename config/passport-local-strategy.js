const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const User=require('../models/user');
//authentiacate using passport
passport.use(new LocalStrategy({
    usernameField:'email',
    //if we need to pass req to callback then we write
    passReqToCallback: true

    },
    function(req, email,password,done){
        //find a user and establish the identity
        User.findOne({email:email},function(err,user){
              if(err){
                req.flash('error',err);
                return done(err);
            }
           
            if(!user || user.password != password){
                
                req.flash('error','Invalid Username/Password');
                return done(null,false);
            }   
            // console.log('***** reached matching user', user);

              return done(null,user);
             });
    }
));

//serializing the user to decide which key is to be kept in cookies
passport.serializeUser(function(user,done){

    done(null,user.id);
})

//deserializing the user from the key in tha cookies
passport.deserializeUser(function(id,done){
   
    User.findById(id,function(err,user){
        if(err){
            console.log('Error in finding User --> Passport');
            return done(err);
        }
        return done(null,user);
    });
})

//check if user is authenticated

passport.checkAuthentication=function(req,res,next){
    //if user is signed in then pass it to next step that is controller action
    if(req.isAuthenticated()){
        return next();
    }
    //if user is not signed in
    return res.redirect('/users/signin');

}

passport.setAuthenticatedUser= function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the current sign in cookie we are just sending it to locals for the views
        res.locals.user=req.user;
    }
    next();
}

module.exports=passport;