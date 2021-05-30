const express = require('express');
const router = express.Router();
const signinController = require('../controllers/signin_controller');

//controller name used-2

router.get('/signinc',signinController.signin_c);

module.exports = router;