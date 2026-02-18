import jsPDF from "jspdf";

export const exportShortlistedPDF = (candidates) => {
  const doc = new jsPDF();
  doc.text("Shortlisted Candidates", 20, 20);

  let y = 30;

  candidates
    .filter((c) => c.status === "shortlisted")
    .forEach((c, i) => {
      doc.text(`${i + 1}. ${c.name || "Candidate"} - ${c.finalScore}%`, 20, y);
      y += 10;
    });

  doc.save("shortlisted_candidates.pdf");
};
