export const getFeedback = (candidate) => {
  if (candidate.finalScore > 80) return "Strong match – ready for interview";

  if (candidate.finalScore > 60) return "Good match – minor skill gaps";

  return "Low match – upskilling recommended";
};
