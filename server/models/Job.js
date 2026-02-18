const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    recruiterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: String,
    description: String,
    requiredSkills: [String],
    experienceLevel: String,
    embedding: [Number],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Job", jobSchema);
