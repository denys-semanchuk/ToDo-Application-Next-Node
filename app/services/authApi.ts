import { LoginCredentials, RegisterCredentials} from '../../types';
import { api } from 'services';

export const authApi = {
  async login(credentials: LoginCredentials) {
    const response = await api.post(`auth/login`, credentials);
    return response.data;
  },

  async register(credentials: RegisterCredentials) {
    const response = await api.post(`auth/register`, credentials);
    return response.data;
  },

  async logout() {
    const response = await api.post(`auth/logout`);
    return response.data;
  }
};
export default api