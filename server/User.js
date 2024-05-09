const mongoose = require("mongoose");
require("./Connection");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    unique:false,
    required: false,
  },
  phone: {
    type: String,
    unique:false,
    required: false,
  },
  googleId: String,
  displayName: String,
  profilePic: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User; 
