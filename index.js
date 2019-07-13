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
const MongoStore=require('connect-mongo')(session);
const sassMiddleware=require('node-sass-middleware');
const flash= require('connect-flash');
const customMiddleware= require('./config/middleware');


app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'expanded',
    prefix:'/css',
}))
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

//mongo store is used to store cookie in db ...install it by npm install connect-mongo
app.use(session({
    name:'codeial',
    //TODO change the secret before deployment to product mode
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:new MongoStore(
        {

        mongooseConnection:db,
        autoRemove:'disabled'

        },
        function(err){
            console.log(err || 'connect mongo-db setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
//for flash message
app.use(flash());
app.use(customMiddleware.setFlash);


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