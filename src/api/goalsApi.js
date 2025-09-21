// src/api/goalsApi.js
import axios from "axios";

const goalsApi = axios.create({
  baseURL: "https://sdlc-fitness-and-diet-training-app.onrender.com/api",
  headers: { "Content-Type": "application/json" },
});

// ✅ Interceptor for token
goalsApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["x-access-token"] = token;
  }
  return config;
});

// ✅ Response interceptor for error handling
goalsApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

// ✅ CRUD methods
export const fetchGoals = async () => {
  const res = await goalsApi.get("/goals");
  return res.data.data || res.data; // Handle different API response structures
};

export const createGoal = async (goalData) => {
  // Add userId from localStorage if not present
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const dataWithUserId = {
    ...goalData,
    userId: goalData.userId || user._id || user.id,
  };
  
  const res = await goalsApi.post("/goals", dataWithUserId);
  return res.data;
};

export const updateGoal = async (id, goalData) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const dataWithUserId = {
    ...goalData,
    userId: goalData.userId || user._id || user.id,
  };
  
  const res = await goalsApi.put(`/goals/${id}`, dataWithUserId);
  return res.data;
};

export const deleteGoal = async (id) => {
  const res = await goalsApi.delete(`/goals/${id}`);
  return res.data;
};

// ✅ Additional helper functions
export const addProgressToGoal = async (goalId, progressData) => {
  const res = await goalsApi.post(`/goals/${goalId}/progress`, progressData);
  return res.data;
};

export const updateProgress = async (goalId, progressId, progressData) => {
  const res = await goalsApi.put(`/goals/${goalId}/progress/${progressId}`, progressData);
  return res.data;
};

export const deleteProgress = async (goalId, progressId) => {
  const res = await goalsApi.delete(`/goals/${goalId}/progress/${progressId}`);
  return res.data;
};

export default goalsApi;