const mongoose = require('mongoose');

const requestSchema = mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    startupID: {
      type: mongoose.Schema.Types.ObjectId,
        ref:"Startup"
    },
    founderID: {
        type: mongoose.Schema.Types.ObjectId,
          ref:"Startup"
      },
    userName:{
        type: String,
        required: false,
    },
    founderName:{
        type: String,
        required: false,
    },
    startupName: {
      type: String,
      required: false,
    },
    motivation: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      default: 'Pending',
      required: false,
    },
  },
  { timestamps: true }
);

const Requet = mongoose.model('Requet', requestSchema);

module.exports = Requet;
