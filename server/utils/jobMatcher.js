// here all calculation for match %, skills, missing skills 
const natural = require("natural");
const skillWeights = require("../data/skillWeights");

const TfIdf = natural.TfIdf;
function extractJobSkills(jobText) {
  const lower = jobText.toLowerCase();
  return Object.keys(skillWeights).filter((skill) => lower.includes(skill));
}

function calculateWeightedMatch(resumeSkills, jobText, experienceLevel) {
  const tfidf = new TfIdf();

  const resumeText = resumeSkills.join(" "); // resumeSkills is an array of candidate skills
  const jobLower = jobText.toLowerCase();
  //we are adding 'resumeText' at index 0, the 'jobLower' at index 1 of tfidf
  tfidf.addDocument(resumeText);
  tfidf.addDocument(jobLower);

  // 1️⃣ TF-IDF similarity means “Give me how similar the job description is to the resume.”
  let similarityScore = 0;
  tfidf.tfidfs(jobLower, (i, measure) => {
    if (i === 0) similarityScore = measure; //here jobLower is compared with index 0 document, which is resumeText. The measure value gives how similar the job description is to the resume
  });

  similarityScore = Math.min(similarityScore * 20, 100);

  // 2️⃣ Extract job-required skills
  const jobSkills = extractJobSkills(jobLower);

  // 3️⃣ Matched skills (intersection)
  const matchedSkills = resumeSkills.filter((skill) =>
    jobSkills.includes(skill),
  );

  // 4️⃣ Missing skills (job − resume)
  const missingSkills = jobSkills.filter(
    (skill) => !resumeSkills.includes(skill),
  );

  // 5️⃣ Weighted skill score (BASED ON JOB SKILLS)
  let obtained = 0;
  let possible = 0;

  // first we are finding the 'weight' of a skill from job description and increment 'possible',
  // then we are checking that same skill is in resume or not, if present increment 'obtained' by 'weight'
  jobSkills.forEach((skill) => {
    const weight = skillWeights[skill] || 1;
    possible += weight;
    if (resumeSkills.includes(skill)) {
      obtained += weight;
    }
  });

  const skillScore = possible ? Math.round((obtained / possible) * 100) : 0;

  // 6️⃣ Experience boost
  let experienceBoost = 0;
  if (experienceLevel === "Entry") experienceBoost = 5;
  if (experienceLevel === "Experienced") experienceBoost = 10;

  // 7️⃣ Final score
  const finalScore = Math.round(
    skillScore * 0.6 + similarityScore * 0.3 + experienceBoost * 0.1,
  );

  return {
    finalScore,
    skillScore,
    similarityScore: Math.round(similarityScore),
    experienceBoost,
    matchedSkills,
    missingSkills,
  };
}


module.exports = { calculateWeightedMatch };
