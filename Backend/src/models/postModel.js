const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    startupID: {
      type: mongoose.Schema.Types.ObjectId,
        ref:"Startup"
    },
    startupName: {
      type: String,
      required: false,
    },
    posttext: {
      type: String,
      required: false,
    },
    postphoto: {
      type: String,
      default: '',
      required: false,
    },
    likecount: {
      type: Number,
      default: 0,
      required: false,
    },
    privacy: {
      type: String,
      default: 'Everyone',
      required: false,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
