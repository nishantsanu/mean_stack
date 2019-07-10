const express=require('express');
const router=express.Router();

const homecontroller=require('../controllers/home_controller');

console.log('router loaded');

router.get('/',homecontroller.home);
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));

module.exports=router;