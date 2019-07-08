const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const User=require('../models/user');
//authentiacate using passport
passport.use(new LocalStrategy({
    usernameField:'email'
    },
    function(email,password,done){
        //find a user and establish the identity
        User.findOne({email:email},function(err,user){
              if(err){
                console.log('Error in finding user --> Passport');
                return done(err);
            }
           console.log(user.password != password);
            if(!user || user.password != password){
                
                console.log('Invalid Username/Password');
                return done(null,false);
            }   
            console.log('***** reached matching user', user);

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

module.exports=passport;