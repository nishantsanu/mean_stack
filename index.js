const express=require('express');
const app=express();
const port=8000;
//import express layout after installing
const expressLayouts=require('express-ejs-layouts');

//require database
const db= require('./config/mongoose');

//using static
app.use(express.static('./assets/'));
//use express layout
app.use(expressLayouts);

//extract style and script from subpages
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


//use express router
app.use('/',require('./routes'));
//view engine express setup
app.set('view engine','ejs');
app.set('views','./views');



app.listen(port,function(err){
    if(err){
        // console.log('error entering port,Error:',err);
        //by interpolation-i.e variable inside string
        console.log(`error entering port,Error:${err}`);
        return;
    }

    console.log('server is running on port: ', port);

})