const express=require('express');
const router=express.Router();
const passport=require('passport');

const commentsController = require('../controllers/comments_controller');

router.post('/create',passport.checkAuthentication, commentsController.create);
// router.get('/destroy/:cid&:pid',passport.checkAuthentication,commentsController.destroy);
router.get('/destroy/:id',passport.checkAuthentication,commentsController.destroy);



module.exports = router;