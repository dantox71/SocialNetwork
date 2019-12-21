const mongoose = require("mongoose");

const ProfileSchema = mongoose.Schema({
  user: {
    ref: "users",
    type: mongoose.Schema.Types.ObjectId
  },

  avatar: {
    type: String
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

    linkedin: {
      type: String
    }
  },

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profiles", ProfileSchema);
