const express=require('express');
const router=express.Router();

const usersController=require('../controllers/users_controller');

router.get('/profile',usersController.profile);
//signin

router.get('/signin',usersController.signin);
//signup
router.get('/signup',usersController.signup);

router.post('/create',usersController.create);

router.post('/createSession',usersController.createSession);

router.get('/signout',usersController.signout);
//another further routers from here
//router.use('/routeName',require('./routeFile'));
router.use('/profile/posts',require('./posts'));

module.exports=router;