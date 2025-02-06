import { LoginCredentials, RegisterCredentials} from '../types';
import { api } from 'services';

export const authApi = {
  async login(credentials: LoginCredentials) {
    const response = await api.post(`/login`, credentials);
    return response.data;
  },

  async register(credentials: RegisterCredentials) {
    const response = await api.post(`/register`, credentials);
    return response.data;
  },

  async logout() {
    const response = await api.post(`/logout`);
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