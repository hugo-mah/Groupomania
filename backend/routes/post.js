const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

router.post('/post', auth, multer, postCtrl.createPost);
router.get('/dashboard', auth, multer, postCtrl.getPost);
router.post('/like', auth, postCtrl.likePost);
router.post('/delete', auth, multer, postCtrl.deletePost);
router.post('/modify/:id', auth, multer, postCtrl.modifyPost);
router.get('/dashboard/:id', auth, postCtrl.getOnePost);

module.exports = router;