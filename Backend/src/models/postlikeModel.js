const mongoose = require('mongoose');

const postlikeSchema = mongoose.Schema(
  {
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    postID: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Post"
    },
  },
  { timestamps: true }
);

const PostLike = mongoose.model('PostLike', postlikeSchema);

module.exports = PostLike;
