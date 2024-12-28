// controllers/postController.js
const postService = require('../services/postService');
const { uploadToS3, uploadMiddleware, deleteFromS3 } = require('../services/s3BucketService');

const FolderNames = {
  POSTS: "posts",
};

// Create Post
const createPost = async (req, res) => {
  uploadMiddleware(req, res, async (err) => {
    if (err) {
      console.error('Error uploading file:', err);
      return res.status(500).json({ success: false, error: { message: 'Image upload failed', details: err.message } });
    }

    try {
      const { accessToken, refreshToken } = req.user;
      const postData = { ...req.body, userID: req.user.id };
      if (req.file) {
        const imageUrl = await uploadToS3(req.file, FolderNames.POSTS);
        if (!imageUrl) {
          return res.sendResponse(500, false, 'Error Uploading Image');
        }
        postData.postphoto = imageUrl
      }
      const post = await postService.createPost(postData);
      if (!post) {
        return res.sendResponse(500, false, 'Post creation failed');
      }
      res.sendResponse(201, true, 'Post created successfully', post, { accessToken, refreshToken });
    } catch (error) {
      res.sendResponse(500, false, error.message);
    }

  })

};

// Get All Posts
const getAllPosts = async (req, res) => {
  try {
    const { accessToken, refreshToken } = req.user;
    const loggedInUserID = req.user.id;
    const posts = await postService.getAllPosts(loggedInUserID);
    if (!posts || posts.length === 0) {
      return res.sendResponse(404, false, 'No posts found');
    }
    res.sendResponse(200, true, 'Posts fetched successfully', posts, { accessToken, refreshToken });
  } catch (error) {
    res.sendResponse(500, false, error.message);
  }
};

// Get Post by ID
const getPostById = async (req, res) => {
  try {
    const { accessToken, refreshToken } = req.user; // Get tokens from req.user
    const post = await postService.getPostById(req.params.id);
    if (!post) {
      return res.sendResponse(404, false, `Post with ID ${req.params.id} not found`);
    }
    res.sendResponse(200, true, 'Post fetched successfully', post, { accessToken, refreshToken });
  } catch (error) {
    res.sendResponse(500, false, error.message);
  }
};

// Get Posts by User ID
const getPostsByUserId = async (req, res) => {
  try {
    const { accessToken, refreshToken } = req.user;
    const posts = await postService.getPostsByUserId(req.user.id);
    if (!posts || posts.length === 0) {
      return res.sendResponse(404, false, `No posts found for User with ID ${req.params.userId}`);
    }
    res.sendResponse(200, true, 'Posts fetched successfully', posts, { accessToken, refreshToken });
  } catch (error) {
    res.sendResponse(500, false, error.message);
  }
};

// Update Post
const updatePost = async (req, res) => {
  try {
    const { accessToken, refreshToken } = req.user; // Get tokens from req.user
    const updatedPost = await postService.updatePost(req.params.id, req.body);
    if (!updatedPost) {
      return res.sendResponse(404, false, `Post with ID ${req.params.id} not found for update`);
    }
    res.sendResponse(200, true, 'Post updated successfully', updatedPost, { accessToken, refreshToken });
  } catch (error) {
    res.sendResponse(500, false, error.message);
  }
};

// Delete Post
const deletePost = async (req, res) => {
  try {
    const { accessToken, refreshToken } = req.user; // Get tokens from req.user
    const deletedPost = await postService.deletePost(req.params.id);
    if (!deletedPost) {
      return res.sendResponse(404, false, `Post with ID ${req.params.id} not found for deletion`);
    }
    res.sendResponse(200, true, 'Post deleted successfully', deletedPost, { accessToken, refreshToken });
  } catch (error) {
    res.sendResponse(500, false, error.message);
  }
};

// Add Like to Post
const addLikeToPost = async (req, res) => {
  try {
    const { accessToken, refreshToken } = req.user;
    const { id } = req.user;
    const { postID } = req.params;

    const result = await postService.addLike(id, postID);
    res.sendResponse(200, true, result.message, null, { accessToken, refreshToken });
  } catch (error) {
    res.sendResponse(500, false, error.message);
  }
};

// Remove Like from Post
const removeLikeFromPost = async (req, res) => {
  try {
    const { accessToken, refreshToken } = req.user;
    const { id } = req.user;
    const { postID } = req.params;

    const result = await postService.removeLike(id, postID);
    res.sendResponse(200, true, "Like Removed", null, { accessToken, refreshToken });
  } catch (error) {
    res.sendResponse(500, false, error.message);
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  getPostsByUserId,
  updatePost,
  deletePost,
  addLikeToPost,
  removeLikeFromPost,
};
