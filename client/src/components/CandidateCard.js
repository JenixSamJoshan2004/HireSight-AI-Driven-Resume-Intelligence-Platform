import SkillChip from "./SkillChip";
import ProgressBar from "./ProgressBar";
import { getFeedback } from "../utils/feedback";

const CandidateCard = ({ candidate, rank, onUpdateStatus }) => {
  const badge =
    rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : `#${rank}`;

  const statusColor =
    candidate.status === "shortlisted"
      ? "bg-green-100 text-green-700"
      : candidate.status === "rejected"
        ? "bg-red-100 text-red-700"
        : "bg-gray-100 text-gray-700";

  return (
    <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          {badge} {candidate.name || "Candidate"}
        </h2>
        <span className="text-lg font-bold text-blue-600">
          {candidate.finalScore}%
        </span>
      </div>

      <ProgressBar value={candidate.finalScore} />

      {/* STATUS BADGE */}
      <span className={`inline-block px-3 py-1 text-sm rounded ${statusColor}`}>
        {candidate.status || "pending"}
      </span>

      {/* MATCHED SKILLS */}
      <div>
        <p className="font-medium">Matched Skills</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {candidate.matchedSkills.map((s) => (
            <SkillChip key={s} skill={s} type="matched" />
          ))}
        </div>
      </div>

      {/* MISSING SKILLS */}
      <div>
        <p className="font-medium">Missing Skills</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {candidate.missingSkills.map((s) => (
            <SkillChip key={s} skill={s} type="missing" />
          ))}
        </div>
      </div>

      {/* RECRUITER FEEDBACK */}
      <p className="italic text-sm text-gray-600 border-l-4 border-blue-400 pl-3">
        {getFeedback(candidate)}
      </p>

      {/* ACTION BUTTONS */}
      {onUpdateStatus && (
        <div className="flex gap-4 pt-2">
          <button
            onClick={() => {
              console.log("SHORTLIST CLICKED", candidate._id);
              onUpdateStatus(candidate._id, "shortlisted");
            }}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Shortlist
          </button>

          <button
            onClick={() => onUpdateStatus(candidate._id, "rejected")}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
};

export default CandidateCard;
