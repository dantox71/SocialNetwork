const mongoose = require("mongoose");

const ProfileSchema = mongoose.Schema({
  user: {
    ref: "users",
    type: mongoose.Schema.Types.ObjectId
  },

  location: {
    type: String
  },

  job: {
    type: String
  },

  status: {
    type: String
  },

  social: {
    instagram: {
      type: String
    },

    facebook: {
      type: String
    },

    youtube: {
      type: String
    },

    instagram: {
      type: String
    }
  },

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profiles", ProfileSchema);
