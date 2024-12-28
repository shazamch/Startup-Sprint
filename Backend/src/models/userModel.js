const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      maxlength: 45,      
      required: false,
    },
    bio: {
      type: String,
      maxlength: 255,
      default: '',
    },
    gender: {
      type: String,
      required: true,
      enum: ['Male', 'Female', 'Other'],
    },
    profilephoto: {
      type: String,
      default: '',
      required: false,
    },
    role: {
      type: String,
      default: 'User',
      required: true,
    },
    otp: {
      type: String,
      default: '000000',
      required: false,
    },
    status: {
      type: String,
      default: 'Active',
      required: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
