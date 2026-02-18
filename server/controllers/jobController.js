// we will find the match %, skills, and missing skills
const Resume = require("../models/Resume");
const { calculateWeightedMatch } = require("../utils/jobMatcher");

exports.matchJob = async (req, res) => {
  try {
    const { jobDescription } = req.body;

    if (!jobDescription) {
      return res.status(400).json({ message: "Job description is required" });
    }

    const resume = await Resume.findOne({ userId: req.user.id });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    const result = calculateWeightedMatch(
      resume.skills,
      jobDescription,
      resume.experienceLevel,
    );

    res.status(200).json({
      finalScore: result.finalScore,
      breakdown: {
        skillScore: result.skillScore,
        similarityScore: result.similarityScore,
        experienceBoost: result.experienceBoost,
      },
      matchedSkills: result.matchedSkills,
      missingSkills: result.missingSkills,
    });

  } catch (error) {
    console.error("JOB MATCH ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};
