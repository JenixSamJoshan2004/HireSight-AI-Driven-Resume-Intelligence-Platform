//CREATE CSV EXPORT UTILITY
import Papa from "papaparse";

export const exportShortlistedToCSV = (candidates) => {
  const shortlisted = candidates.filter((c) => c.status === "shortlisted");

  if (shortlisted.length === 0) {
    alert("No shortlisted candidates to export");
    return;
  }

  const data = shortlisted.map((c) => ({
    Name: c.name || "Candidate",
    Score: c.finalScore,
    "Matched Skills": c.matchedSkills.join(", "),
    "Missing Skills": c.missingSkills.join(", "),
    Status: c.status,
  }));

  const csv = Papa.unparse(data);

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `shortlisted_${Date.now()}.csv`; //Rename file dynamically:

  link.click();

  URL.revokeObjectURL(url);
};
