const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

router.post('/post', auth, multer, postCtrl.createPost);
router.get('/dashboard', auth, multer, postCtrl.getPost);

module.exports = router;