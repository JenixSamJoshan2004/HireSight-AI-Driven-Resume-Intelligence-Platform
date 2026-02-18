const Resume = require("../models/Resume");
const pdf = require("pdf-parse-fork");
const { extractSkills } = require("../utils/skillExtractor");
const { calculateWeightedMatch } = require("../utils/jobMatcher");

exports.rankCandidates = async (req, res) => {
  try {
    const { jobDescription } = req.body;
    const files = req.files;

    if (!jobDescription || !files || files.length === 0) {
      return res
        .status(400)
        .json({ message: "Missing job description or files" });
    }

    const rankedCandidates = await Promise.all(
      files.map(async (file) => {
        // 1️⃣ Parse PDF
        const pdfData = await pdf(file.buffer);
        const resumeText = pdfData.text;

        // 2️⃣ Extract skills
        const aiData = extractSkills(resumeText);
        const resumeSkills = aiData.skills || [];
        const experienceLevel = aiData.experience_level || "Entry";

        // 3️⃣ Calculate match
        const match = calculateWeightedMatch(
          resumeSkills,
          jobDescription,
          experienceLevel,
        );

        // 4️⃣ SAVE RESUME TO DB (IMPORTANT 🔥)
        const savedResume = await Resume.create({
          rawText: resumeText,
          skills: resumeSkills,
          tools: aiData.tools || [],
          role: aiData.role || "Not Specified",
          experienceLevel,
          status: "pending",
        });

        // 5️⃣ RETURN DATA TO FRONTEND
        return {
          _id: savedResume._id, // ✅ REAL DB ID
          name: file.originalname.replace(".pdf", ""),
          finalScore: match.finalScore,
          matchedSkills: match.matchedSkills,
          missingSkills: match.missingSkills,
          skillScore: match.skillScore,
          experienceLevel,
          status: "pending",
        };
      }),
    );

    res.json({ rankedCandidates });
  } catch (err) {
    console.error("RANK ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};
