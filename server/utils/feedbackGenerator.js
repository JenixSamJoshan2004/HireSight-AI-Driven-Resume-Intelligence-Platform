//FEEDBACK ENGINE, becoz we dont have any paid AI to give feedback
function generateFeedback({
  finalScore,
  matchedSkills,
  missingSkills,
  experienceLevel,
}) {
  let feedback = "";

  if (finalScore >= 80) {
    feedback = "Excellent match for the role.";
  } else if (finalScore >= 60) {
    feedback = "Good profile, but some improvements are needed.";
  } else {
    feedback = "Currently a weak match for this role.";
  }

  if (missingSkills.length > 0) {
    feedback += ` Missing skills: ${missingSkills.join(", ")}.`;
  }

  if (experienceLevel === "Entry") {
    feedback += " Suitable for fresher or junior positions.";
  }

  return feedback;
}

module.exports = { generateFeedback };
