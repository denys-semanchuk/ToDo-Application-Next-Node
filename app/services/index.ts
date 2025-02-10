import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_APP_API_URI
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
