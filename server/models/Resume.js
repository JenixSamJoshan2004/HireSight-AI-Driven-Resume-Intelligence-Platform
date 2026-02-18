const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  rawText: String,
  skills: [String],
  tools: [String],
  role: String,
  experienceLevel: String,
  status: {
    type: String,
    enum: ["pending", "shortlisted", "rejected"],
    default: "pending",
  },
});

module.exports = mongoose.model("Resume", resumeSchema);
