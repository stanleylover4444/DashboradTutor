import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://171.244.139.41:5000/dashboard';

export const accessToken = createAsyncThunk(
  'auth/accessToken',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/token`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log('Lấy thông tin người dùng thành công', response.data);
      return response.data;
    } catch (error: any) {
      let errorMessage = 'Lấy thông tin thất bại!';
      if (error.response) {
        errorMessage = error.response.data?.message || errorMessage;
      } else if (error.request) {
        errorMessage = 'Không thể kết nối đến server!';
      } else {
        errorMessage = error.message;
      }
      return rejectWithValue(errorMessage);
    }
  },
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (
    credentials: { username: string; password: string },
    { rejectWithValue },
  ) => {
    console.log('Đăng nhập');
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials);
      console.log('Đăng nhập thành công', response.data);

      const { token } = response.data;
      localStorage.setItem('token', token);

      return response.data;
    } catch (error: any) {
      let errorMessage = 'Đăng nhập thất bại!';
      if (error.response) {
        errorMessage = error.response.data?.message || errorMessage;
      } else if (error.request) {
        errorMessage = 'Không thể kết nối đến server!';
      } else {
        errorMessage = error.message;
      }
      return rejectWithValue(errorMessage);
    }
  },
);

export const updateUserInfo = createAsyncThunk(
  'auth/updateUserInfo',
  async (
    { userId, payload }: { userId: string; payload: any },
    { rejectWithValue },
  ) => {
    console.log('{ userId, payload }', { userId, payload });
    try {
      const response = await axios.put(`${API_URL}/staffs/${userId}`, payload);
      console.log('Cập nhật thành công', response.data);
      return response.data;
    } catch (error: any) {
      let errorMessage = 'Cập nhật thất bại!';
      if (error.response) {
        errorMessage = error.response.data?.message || errorMessage;
      } else if (error.request) {
        errorMessage = 'Không thể kết nối đến server!';
      } else {
        errorMessage = error.message;
      }
      return rejectWithValue(errorMessage);
    }
  },
);
