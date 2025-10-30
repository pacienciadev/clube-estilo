import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL,
  timeout: 7000,
});

// Interceptor de requisição
axiosInstance.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("@ACCESS_TOKEN") ||
      sessionStorage.getItem("@ACCESS_TOKEN");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de resposta
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.clear();
      sessionStorage.clear();

      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export { axiosInstance as useAxios };
