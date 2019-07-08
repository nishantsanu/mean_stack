const express=require('express');
const router=express.Router();
const passport=require('passport');

const usersController=require('../controllers/users_controller');

router.get('/profile',usersController.profile);
//signin

router.get('/signin',usersController.signin);
//signup
router.get('/signup',usersController.signup);

router.post('/create',usersController.create);

//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/signin'},
),usersController.createSession);


//another further routers from here
//router.use('/routeName',require('./routeFile'));
// router.use('/profile/posts',require('./posts'));

module.exports=router;