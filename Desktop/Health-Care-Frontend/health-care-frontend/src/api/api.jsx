import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8081",
});

api.interceptors.request.use((config) => {
  const token = "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MzAsInN1YiI6ImFkbWluOCIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc4NDg5NDIxNCwiZXhwIjoxNzg0OTMwMjE0fQ.HN4Z49ZsDVCA_Fo_YNmbsMB-uT-wI_so01iUs3aNfxHP8CaVnp9XsFZrcT-tbzZLi3GsQ6B0zYKiJx9J0G7xhw";

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;