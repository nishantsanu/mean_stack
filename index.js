const express=require('express');
const app=express();
const port=8000;
const cookieParser= require('cookie-parser');
//import express layout after installing
const expressLayouts=require('express-ejs-layouts');

//require database
const db= require('./config/mongoose');
//used for session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');

app.use(express.urlencoded());
app.use(cookieParser());

//using static
app.use(express.static('./assets/'));
//use express layout
app.use(expressLayouts);

//extract style and script from subpages
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



//view engine express setup
app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name:'codeial',
    //TODO change the secret before deployment to product mode
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

//use express router
app.use('/',require('./routes'));



app.listen(port,function(err){
    if(err){
        // console.log('error entering port,Error:',err);
        //by interpolation-i.e variable inside string
        console.log(`error entering port,Error:${err}`);
        return;
    }

    console.log('server is running on port: ', port);

})