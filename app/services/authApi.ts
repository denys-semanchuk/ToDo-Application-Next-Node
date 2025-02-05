import axios from 'axios';
import { LoginCredentials, RegisterCredentials} from '../types';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
})

export const authApi = {
  async login(credentials: LoginCredentials) {
    const response = await api.post(`/login`, credentials);
    return response.data;
  },

  async register(credentials: RegisterCredentials) {
    const response = await axios.post(`/register`, credentials);
    return response.data;
  },

  async logout() {
    const response = await axios.post(`/logout`);
    return response.data;
  }
};


api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api