const express=require('express');
const app=express();
const port=8000;

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