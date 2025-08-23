import axios from "axios";

const baseURL =
  import.meta.env.VITE_ENV === "production"
    ? "https://api.prod.com" //substituir para url/ip publico da maquina virtual quando for para produção
    : "http://localhost:3000";

const token =
  localStorage.getItem("@ACCESS_TOKEN") ||
  sessionStorage.getItem("@ACCESS_TOKEN");

const axiosInstance = axios.create({
  baseURL,
  timeout: 7000,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export { axiosInstance as useAxios };
