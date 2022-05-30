const mongoose = require("mongoose");
const GoalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    task: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Goals", GoalSchema);
