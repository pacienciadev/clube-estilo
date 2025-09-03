import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

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
