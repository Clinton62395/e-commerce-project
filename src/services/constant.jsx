import axios from "axios";
export const API_URL = import.meta.env.VITE_API_URL; 

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
console.log("url", import.meta.env.VITE_API_URL);
