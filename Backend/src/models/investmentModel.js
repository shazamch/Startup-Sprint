const mongoose = require('mongoose');

const investmentSchema = mongoose.Schema(
  {
    userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
    },
    startupID: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Startup"
    },
    investment: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

const Investment = mongoose.model('Investment', investmentSchema);

module.exports = Investment;
