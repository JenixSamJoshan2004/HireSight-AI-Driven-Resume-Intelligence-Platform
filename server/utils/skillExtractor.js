const { removeStopwords } = require("stopword");
const skillsData = require("../data/skills");

function extractSkills(text) {
  //Actual NLP-based implementation happens here
  //meaningextracts all skills, tools, role, experience etc 

  const cleanText = text.toLowerCase(); //  converts text from resume to lowercase
  const words = cleanText.match(/\b[a-z]+\b/g) || []; //here we are matching a word by regex, words contains array of words
  const filteredWords = removeStopwords(words);// finally removing stopwords like a, the, this, was.....

  // Skills
  const foundSkills = skillsData.skills.filter((skill) =>
    cleanText.includes(skill),
  );

  // Tools
  const foundTools = skillsData.tools.filter((tool) =>
    cleanText.includes(tool),
  );

  // Role detection (PARTIAL MATCH)
  let detectedRole = "Not Specified";
  let maxMatches = 0;

  for (const role in skillsData.roles) {
    const roleSkills = skillsData.roles[role];
    const matchCount = roleSkills.filter((skill) =>
      cleanText.includes(skill),
    ).length;

    if (matchCount > maxMatches) {
      maxMatches = matchCount;
      detectedRole = role;
    }
  }

  // Experience detection
  let experienceLevel = "Fresher";

  if (/intern(ship)?/.test(cleanText)) {
    experienceLevel = "Entry";
  }

  if (/\b(2|3|4|5)\s*\+?\s*(years|yrs)\b/.test(cleanText)) {
    experienceLevel = "Experienced";
  }

  return {
    skills: [...new Set(foundSkills)],
    tools: [...new Set(foundTools)],
    role: detectedRole,
    experience_level: experienceLevel,
  };
}

module.exports = { extractSkills }; 
