import { useState } from "react";
import CandidateCard from "../components/CandidateCard";
import { rankCandidates, updateCandidateStatus } from "../api/api";
import UploadForm from "../components/UploadForm";
import { exportShortlistedToCSV } from "../utils/exportCSV";
import AnalyticsDashboard from "../components/AnalyticsDashboard";
import { exportShortlistedPDF } from "../utils/exportPdf";

const Rank = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("all");

  const handleSubmit = async (jobDesc, files) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("jobDescription", jobDesc);

      for (let file of files) {
        formData.append("resumes", file);
      }

      const res = await rankCandidates(formData);

      const rankedWithStatus = res.data.rankedCandidates.map((c) => ({
        ...c,
        status: "pending",
      }));

      setCandidates(rankedWithStatus);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await updateCandidateStatus(id, status);
      setCandidates((prev) =>
        prev.map((c) => (c._id === id ? { ...c, status } : c)),
      );
    } catch (err) {
      console.error(err);
    }
  };

  const sortedCandidates = [...candidates].sort(
    (a, b) => b.finalScore - a.finalScore,
  );

  const visibleCandidates =
    view === "shortlisted"
      ? sortedCandidates.filter((c) => c.status === "shortlisted")
      : sortedCandidates;

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-xl font-semibold">Analyzing resumes...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-sky-950">
        Candidate Ranking Dashboard
      </h1>

      {/* ✅ UPLOAD */}
      <UploadForm onSubmit={handleSubmit} />

      {/* 📊 ANALYTICS DASHBOARD */}
      {candidates.length > 0 && (
        <div className="mt-8">
          <AnalyticsDashboard candidates={sortedCandidates} />
        </div>
      )}

      {/* ✅ TABS */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={() => setView("all")}
          className={`px-4 py-2 rounded ${
            view === "all" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          All Candidates
        </button>

        <button
          onClick={() => setView("shortlisted")}
          className={`px-4 py-2 rounded ${
            view === "shortlisted" ? "bg-green-600 text-white" : "bg-gray-200"
          }`}
        >
          Shortlisted
        </button>

        <button
          onClick={() => exportShortlistedToCSV(candidates)}
          className="px-4 py-2 bg-purple-600 text-white rounded"
        >
          Export Shortlisted (CSV)
        </button>

        <button
          onClick={() => exportShortlistedPDF(sortedCandidates)}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Export Shortlisted (PDF)
        </button>
      </div>

      {/* ✅ RESULTS */}
      <div className="grid gap-6 mt-6">
        {visibleCandidates.map((c, i) => (
          <CandidateCard
            key={c._id || i}
            candidate={c}
            rank={i + 1}
            onUpdateStatus={updateStatus}
          />
        ))}
      </div>
    </div>
  );
};

export default Rank; 
