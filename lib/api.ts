import axios from "axios";
import { ApiError } from "@/types/api-error";

const api = axios.create({
  baseURL: process.env.API_URL,
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const normalized: ApiError = {
      message:
        error.response?.data?.message ||
        error.message ||
        "Ocurrió un error inesperado",
      status: error.response?.status || 0,
      data: error.response?.data || null,
    };
    return Promise.reject(normalized);
  },
);

export default api;
