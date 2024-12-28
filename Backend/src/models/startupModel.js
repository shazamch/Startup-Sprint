const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  street1: {
    type: String,
    default: '',
    maxlength: 255,
  },
  street2: {
    type: String,
    default: '',
    maxlength: 255,
  },
  city: {
    type: String,
    default: '',
    maxlength: 100,
  },
  state: {
    type: String,
    default: '',
    maxlength: 100,
  },
  zipcode: {
    type: String,
    default: '',
    maxlength: 20,
  },
  country: {
    type: String,
    default: '',
    maxlength: 100,
  },
});

const linkSchema = mongoose.Schema({
    facebook: { type: String, default: '' },
    instagram: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    twitter: { type: String, default: '' },
    website: { type: String, default: '' },
    morelinks: { type: [String], default: [] },
  });

const startupSchema = mongoose.Schema(
  {
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: false,
    },
    stroy: {
      type: String,
      required: false,
    },
    profilephoto: {
      type: String,
      default: '',
      required: false,
    },
    funds: {
      type: String,
      required: true,
    },
    evaluation: {
      type: String,
      required: true,
    },
    links: {
        type: linkSchema,
        default: {},
        required: false,
      },
    type: {
      type: String,
      enum: ['Service', 'Product', 'Hybrid'],
      required: false,
    },
    evaluation: {
      type: String,
      required: true,
    },
    address: {
      type: addressSchema,
      default: {}
    },
    members: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }],    
    status: {
      type: String,
      default: 'Active',
      required: false,
    },
  },
  { timestamps: true }
);

const Startup = mongoose.model('Startup', startupSchema);

module.exports = Startup;
