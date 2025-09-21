// src/api/dailyLogsApi.js
import axios from "axios";

const dailyLogsApi = axios.create({
  baseURL: "https://sdlc-fitness-and-diet-training-app.onrender.com/api",
  headers: { "Content-Type": "application/json" },
});

// Always attach token
dailyLogsApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["x-access-token"] = token;
  }
  return config;
});

// GET all logs
export const fetchLogs = async () => {
  const res = await dailyLogsApi.get("/logs");
  return res.data.data; // backend: { status, data: [...] }
};

// POST new log
export const createLog = async (log) => {
  const res = await dailyLogsApi.post("/logs", log);
  return res.data.data;
};

// PUT update log
export const updateLog = async ({ id, updates }) => {
  const res = await dailyLogsApi.put(`/logs/${id}`, updates);
  return res.data.data;
};

// DELETE log
export const deleteLog = async (id) => {
  const res = await dailyLogsApi.delete(`/logs/${id}`);
  return res.data;
};

export default dailyLogsApi;
