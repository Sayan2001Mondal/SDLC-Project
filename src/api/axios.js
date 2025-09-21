import axios from "axios";

const api = axios.create({
  baseURL: "https://sdlc-fitness-and-diet-training-app.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;



