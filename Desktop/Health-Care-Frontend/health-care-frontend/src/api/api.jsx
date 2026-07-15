import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8081",
});

api.interceptors.request.use((config) => {
  const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbjEiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3ODQxMjQyNjEsImV4cCI6MTc4NDE2MDI2MX0.9ESikY2JTb_nSn7AXyWleAVeCoWOwdXHirqvxJQx3kwLSyJ3GV5VS0QvF2N_KyTm7twlZJ64Z7kHPvjQaFa0sw";

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;