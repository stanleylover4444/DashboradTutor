import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://171.244.139.41:5000/api';

export const getCustomer = createAsyncThunk(
  'customer/getCustomer',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/customers/`, {
      });
      console.log('Lấy thông tin tất cả khách hàng thành công', response.data);
      return response.data;
    } catch (error: any) {
      let errorMessage = 'Lấy thông tin khách hàng thất bại!';
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

export const updateCustomer = createAsyncThunk(
  'customer/updateCustomer',
  async (
    { customerId, payload }: { customerId: string; payload: any },
    { rejectWithValue },
  ) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${API_URL}/customers/${customerId}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Cập nhật thông tin khách hàng thành công', response.data);
      return response.data;
    } catch (error: any) {
      let errorMessage = 'Cập nhật thông tin khách hàng thất bại!';
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

export const createCustomer = createAsyncThunk(
  'customer/createCustomer',
  async (
    customerData: {
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
      const response = await axios.post(`${API_URL}/customers/`, customerData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Tạo khách hàng thành công', response.data);
      return response.data;
    } catch (error: any) {
      let errorMessage = 'Tạo khách hàng thất bại!';
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