const mongoose = require("mongoose");

const ProfileSchema = mongoose.Schema({
  user: {
    ref: "users",
    type: mongoose.Schema.Types.ObjectId
  },

  avatar: {
    type: String,
    default:
      "https://c8.alamy.com/comp/H8GCMR/user-avatar-icon-sign-symbol-H8GCMR.jpg"
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
