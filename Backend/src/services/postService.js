const Post = require('../models/postModel');
const PostLike = require('../models/postlikeModel');

// Create Post
const createPost = async (postData) => {
  const post = new Post(postData);
  const savedPost = await post.save();
  if (!savedPost) {
    throw new Error('Post creation failed');
  }
  return savedPost;
};

// Get All Posts
const getAllPosts = async (loggedInUserID) => {
  const posts = await Post.find()
    .populate('userID', 'name profilephoto')

  if (!posts || posts.length === 0) {
    throw new Error('No posts found');
  }
  // For each post, check if the logged-in user has liked it
  const postsWithLikeStatus = await Promise.all(posts.map(async (post) => {
    const likedPost = await PostLike.findOne({
      userID: loggedInUserID,
      postID: post._id,
    });
    
    return {
      _id: post._id,
      user: {
        _id: post.userID._id,
        name: post.userID.name,
        profilephoto: post.userID.profilephoto,
      },
      startupID: post.startupID,
      startupName: post.startupName,
      posttext: post.posttext,
      postphoto: post.postphoto,
      likecount:post.likecount,
      privacy: post.privacy,
      updatedAt: post.updatedAt,
      liked: likedPost ? true : false,
    };
  }));

  return postsWithLikeStatus;
};

// Get Post by ID
const getPostById = async (id) => {
  const post = await Post.findById(id).populate('userID', 'name profilephoto');
  if (!post) {
    throw new Error(`Post with ID ${id} not found`);
  }
  return post;
};

// Get Posts by User ID
const getPostsByUserId = async (userId) => {
  const posts = await Post.find({ userID: userId }).populate('userID', 'name profilephoto');
  if (!posts || posts.length === 0) {
    throw new Error(`No posts found for User with ID ${userId}`);
  }

  const postsWithLikeStatus = await Promise.all(posts.map(async (post) => {
    const likedPost = await PostLike.findOne({
      userID: userId,
      postID: post._id,
    });
    
    return {
      _id: post._id,
      user: {
        _id: post.userID._id,
        name: post.userID.name,
        profilephoto: post.userID.profilephoto,
      },
      startupID: post.startupID,
      startupName: post.startupName,
      posttext: post.posttext,
      postphoto: post.postphoto,
      likecount:post.likecount,
      privacy: post.privacy,
      updatedAt: post.updatedAt,
      liked: likedPost ? true : false,
    };
  }));
  
  return postsWithLikeStatus;
};

// Update Post
const updatePost = async (id, updateData) => {
  const updatedPost = await Post.findByIdAndUpdate(id, updateData, { new: true });
  if (!updatedPost) {
    throw new Error(`Post with ID ${id} not found for update`);
  }
  return updatedPost;
};

// Delete Post
const deletePost = async (id) => {
  const deletedPost = await Post.findByIdAndDelete(id);
  if (!deletedPost) {
    throw new Error(`Post with ID ${id} not found for deletion`);
  }
  return deletedPost;
};

// Add Like to Post
const addLike = async (userID, postID) => {
  const existingLike = await PostLike.findOne({ userID, postID });
  if (existingLike) {
    return { message: 'Post already liked.' };
  }
  const newLike = new PostLike({ userID, postID });
  await newLike.save();

  await Post.findByIdAndUpdate(postID, { $inc: { likecount: 1 } });

  return { message: 'Post liked successfully' };
};

// Remove Like from Post
const removeLike = async (userID, postID) => {
  const existingLike = await PostLike.findOne({ userID, postID });
  if (!existingLike) {
    throw new Error('You have not liked this post yet');
  }
  await PostLike.findByIdAndDelete(existingLike._id);
  await Post.findByIdAndUpdate(postID, { $inc: { likecount: -1 } });

  return { message: 'Post unliked successfully' };
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  getPostsByUserId,
  updatePost,
  deletePost,
  addLike,
  removeLike,
};
