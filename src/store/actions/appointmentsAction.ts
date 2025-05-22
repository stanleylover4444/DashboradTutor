import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://171.244.139.41:5000/api';

export const getAppointment = createAsyncThunk(
  'appointment/getAppointment',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/appointments/`, {
      });
      console.log('Lấy thông tin tất cả appointment thành công', response.data);
      return response.data;
    } catch (error: any) {
      let errorMessage = 'Lấy thông tin appointment thất bại!';
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