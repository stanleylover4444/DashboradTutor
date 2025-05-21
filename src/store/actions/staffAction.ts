import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://171.244.139.41:5000/dashboard';

export const getStaff = createAsyncThunk(
  'staff/getStaff',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/staffs/`, {
      });
      console.log('Lấy thông tin tất cả nhân viên thành công', response.data);
      return response.data;
    } catch (error: any) {
      let errorMessage = 'Lấy thông tin nhân viên thất bại!';
      if (error.response) {
        errorMessage = error.response.data?.error || errorMessage;
      } else if (error.request) {
        errorMessage = 'Không thể kết nối đến server!';
      } else {
        errorMessage = error.message;
      }
      return rejectWithValue(errorMessage);
    }
  },
);

export const updateStaff = createAsyncThunk(
  'staff/updateStaff',
  async (
    { staffId, payload }: { staffId: string; payload: any },
    { rejectWithValue },
  ) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${API_URL}/staffs/${staffId}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Cập nhật thông tin nhân viên thành công', response.data);
      return response.data;
    } catch (error: any) {
      let errorMessage = 'Cập nhật thông tin nhân viên thất bại!';
      if (error.response) {
        errorMessage = error.response.data?.error || errorMessage;
      } else if (error.request) {
        errorMessage = 'Không thể kết nối đến server!';
      } else {
        errorMessage = error.message;
      }
      return rejectWithValue(errorMessage);
    }
  },
);

export const createStaff = createAsyncThunk(
  'staff/createStaff',
  async (
    staffData: {
      username: string;
      password: string;
      name: string;
      phone: string;
      avatar?: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/staffs/`, staffData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Tạo nhân viên thành công', response.data);
      return response.data;
    } catch (error: any) {
      let errorMessage = 'Tạo nhân viên thất bại!';
      if (error.response) {
        errorMessage = error.response.data?.error || errorMessage;
      } else if (error.request) {
        errorMessage = 'Không thể kết nối đến server!';
      } else {
        errorMessage = error.message;
      }
      return rejectWithValue(errorMessage);
    }
  },
);
