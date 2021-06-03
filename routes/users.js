const express = require('express');
const router =express.Router();
const passport = require('passport');

const userController = require('../controllers/users_controller');

router.get('/profile',passport.checkAuthentication,userController.profile);

router.get('/sign-in',userController.signIn);
router.get('/sign-up',userController.signUp);


router.post('/create',userController.create);
// router.post('/create-session',userController.createSessions);


//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect : '/user/sign-in'},
),userController.createSession);

module.exports = router;
