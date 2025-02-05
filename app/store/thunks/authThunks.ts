import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import api, { authApi } from 'services/authApi';
import { LoginCredentials, RegisterCredentials, User } from 'types';

export const loginThunk = createAsyncThunk<
  { user: User; token: string },
  LoginCredentials,
  { rejectValue: string }
>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      const data = await response.json()

      if (!response.ok) {
        return rejectWithValue(data.message || 'Login failed')
      }

      localStorage.setItem('token', data.token)
      return data
    } catch (error) {
      console.error('Login failed:', error)
      return rejectWithValue('Network error')
    }
  }
)

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (credentials: RegisterCredentials, { rejectWithValue }) => {
    try {
      const data = await authApi.register(credentials);
      localStorage.setItem('token', data.token);
      return data.user;
    } catch (error) {
      return rejectWithValue(error instanceof AxiosError && error.response?.data?.message || 'Registration failed');
    }
  }
);

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authApi.logout();
      localStorage.removeItem('token');
    } catch (error) {
      return rejectWithValue(error instanceof AxiosError && error.response?.data?.message || 'Logout failed');
    }
  }
);

export const checkAuthToken = createAsyncThunk(
  'auth/checkToken',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        return rejectWithValue('No token found')
      }

      const response = await api.get('/verify')
      return response.data
    } catch (error) {
      localStorage.removeItem('token')
      console.log(error)
      return rejectWithValue('Invalid token')
    }
  }
)