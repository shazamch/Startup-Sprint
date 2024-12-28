// routes/postRoutes.js
const express = require('express');
const postController = require('../controllers/postController');
const router = express.Router();

router.post('/', postController.createPost);
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.get('/user/:userId', postController.getPostsByUserId);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);
router.post('/like/:postID', postController.addLikeToPost);
router.delete('/like/:postID', postController.removeLikeFromPost);

module.exports = router;
