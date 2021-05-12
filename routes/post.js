const express = require('express');
const router =express.Router();
const postController = require('../controllers/post_controller');

router.get('/postStatus',postController.postStatus);

module.exports = router;