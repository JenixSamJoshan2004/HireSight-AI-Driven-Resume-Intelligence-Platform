const fs = require("fs");
const Resume = require("../models/Resume");
const pdf = require("pdf-parse-fork");
const { extractSkills } = require("../utils/skillExtractor");

// ✅ UPLOAD RESUME
exports.uploadResume = async (req, res) => {
  const filePath = req.file ? req.file.path : null;

  try {
    if (!filePath) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const dataBuffer = fs.readFileSync(filePath); // first it reads the file
    const pdfData = await pdf(dataBuffer); // then extracts from what they read, this extract contains (metadata + text)
    const extractedText = pdfData.text;// converting extracted data int .text

    const aiData = extractSkills(extractedText);// here we perform NLP

    await Resume.create({
      userId: req.user.id,
      rawText: extractedText,
      skills: aiData.skills || [],
      tools: aiData.tools || [],
      role: aiData.role || "Not Specified",
      experienceLevel: aiData.experience_level || "Entry",
    });

    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    res.status(201).json({
      message: "Resume processed successfully",
      skills: aiData.skills,
      tools: aiData.tools,
      role: aiData.role,
      experience: aiData.experience_level,
    });
  } catch (error) {
    if (filePath && fs.existsSync(filePath)) fs.unlinkSync(filePath);
    res.status(500).json({ error: error.message });
  }
};

// ✅ UPDATE STATUS (SHORTLIST / REJECT)
exports.updateResumeStatus = async (req, res) => {
  try {
    const { status } = req.body;
    console.log(status);
    if (!["shortlisted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const resume = await Resume.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }
 
    res.json(resume);
  } catch (err) {
    console.error("STATUS UPDATE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};
