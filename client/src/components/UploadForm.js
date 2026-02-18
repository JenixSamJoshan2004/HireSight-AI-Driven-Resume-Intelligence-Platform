import { useState } from "react";

const UploadForm = ({ onSubmit }) => {
  const [jobDesc, setJobDesc] = useState("");
  const [files, setFiles] = useState([]);
  
  
  return (
    <div className="bg-sky-950 p-6 rounded-lg shadow mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-100">
        Upload Job Description & Resumes
      </h2>

      <textarea
        placeholder="Paste Job Description..."
        className="w-full border p-3 rounded mb-4 bg-gray-200"
        rows={4}
        value={jobDesc}
        onChange={(e) => setJobDesc(e.target.value)}
      />

      <input
        type="file"
        multiple
        className="mb-4"
        onChange={(e) => setFiles(e.target.files)}
      />

      <button
        onClick={() => onSubmit(jobDesc, files)}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Rank Candidates
      </button>
    </div>
  );
};

export default UploadForm;
