const express=require('express');
const router=express.Router();

const usersController=require('../controllers/users_controller');

router.get('/profile',usersController.profile);

//another further routers from here
//router.use('/routeName',require('./routeFile'));
router.use('/profile/posts',require('./posts'));

module.exports=router;