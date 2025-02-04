import axios from 'axios';
import { LoginCredentials, RegisterCredentials, User } from '@/types';

const API_URL = 'http://localhost:5000/api/auth';

export const authApi = {
  async login(credentials: LoginCredentials) {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  },

  async register(credentials: RegisterCredentials) {
    const response = await axios.post(`${API_URL}/register`, credentials);
    return response.data;
  },

  async logout() {
    const response = await axios.post(`${API_URL}/logout`);
    return response.data;
  }
};