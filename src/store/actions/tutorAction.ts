import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://171.244.139.41:5000/dashboard';

export const    getTutor = createAsyncThunk(
  'tutor/getTutor',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/users/`, {
      });
      console.log('Lấy thông tin tất cả gia sư thành công', response.data);
      return response.data;
    } catch (error: any) {
      let errorMessage = 'Lấy thông tin gia sư thất bại!';
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

export const updateTutor = createAsyncThunk(
  'tutor/updateTutor',
  async (
    { tutorId, payload }: { tutorId: string; payload: any },
    { rejectWithValue },
  ) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${API_URL}/tutors/${tutorId}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Cập nhật thông tin gia sư thành công', response.data);
      return response.data;
    } catch (error: any) {
      let errorMessage = 'Cập nhật thông tin gia sư thất bại!';
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

export const createTutor = createAsyncThunk(
  'tutor/createTutor',
  async (
    tutorData: {
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
      const response = await axios.post(`${API_URL}/tutors/`, tutorData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Tạo gia sư thành công', response.data);
      return response.data;
    } catch (error: any) {
      let errorMessage = 'Tạo gia sư thất bại!';
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