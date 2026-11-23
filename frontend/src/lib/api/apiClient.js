import axios from "axios";
import useAuthStore from "../store/authStore";

const API_URI = "http://localhost:3000/api";

const api = axios.create({
  baseURL: API_URI,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceter to add Authorization header
api.interceptors.request.use((config)=>{
  
  const token = useAuthStore.getState().token;

  if(token){
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default api;
