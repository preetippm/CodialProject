const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');



router.get('/',homeController.home);
router.use('/users',require('./users'));
router.use('/post',require('./post'));
//page name-1
router.use('/signin',require('./signin'));

module.exports= router;