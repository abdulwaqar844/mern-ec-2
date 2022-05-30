const mongoose = require("mongoose");

const User = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  // avatar: {
  //   type: String,
  //   required: true,
  // },
  // Role: {
  //   type: String,
  //   enum: ["User", "Technician", "Admin"],
  //   // required: true,
  // },
});
module.exports = new mongoose.model("User", User);
