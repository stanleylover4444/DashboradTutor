import { createSlice } from '@reduxjs/toolkit';
import { getCustomer } from '../actions/customerActions';


const customerSlice = createSlice({
  name: 'customer',
  initialState: {
    customer: [],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //GET CUSTOMER
      .addCase(getCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.customer = action.payload;
      })
      .addCase(getCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })


  },
});

export default customerSlice.reducer;