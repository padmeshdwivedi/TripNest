const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  // Add your own fields if needed, like:
  email: {
    type: String,
    required: true
  }
  // Don't add username/password — passport-local-mongoose does it
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
