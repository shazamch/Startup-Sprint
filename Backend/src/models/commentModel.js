const mongoose = require('mongoose');

const commentSchema = mongoose.Schema(
  {
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    postID: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Post"
    },
    commnettext: {
        type: String,
        required: true,
        unique: true,
    }
  },
  { timestamps: true }
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
