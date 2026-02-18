import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const rankCandidates = (data) =>
  API.post("/rank", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const updateCandidateStatus = (id, status) =>
  API.patch(`/resumes/${id}/status`, { status });

export default API;
