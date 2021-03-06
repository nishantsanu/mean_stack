const express=require('express');
const router=express.Router();
const passport=require('passport');

const usersController=require('../controllers/users_controller');

// router.use('/profile',require('./profile'));

router.get('/profile/:id',passport.checkAuthentication,usersController.profile);
//update
router.post('/update/:id',passport.checkAuthentication,usersController.update);



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

router.get('/signout',usersController.destroySession);
// router.use('/profile/posts',require('./posts'));

router.get('/deleteAccount/:id',passport.checkAuthentication,usersController.destroyAccount);

router.get('/auth/google', passport.authenticate('google', {scope: ['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect: '/users/signin'}),usersController.createSession);




module.exports=router;