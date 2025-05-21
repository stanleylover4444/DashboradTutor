import { createSlice } from '@reduxjs/toolkit';
import { createStaff, getStaff, updateStaff } from '../actions/staffAction';

const staffSlice = createSlice({
  name: 'staff',
  initialState: {
    staff: [],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      //GET STAFF
      .addCase(getStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.staff = action.payload;
      })
      .addCase(getStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      //UPDATE STAFF
      .addCase(updateStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.staff = action.payload;
      })
      .addCase(updateStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      //CREATE STAFF
      .addCase(createStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.staff = action.payload;
      })
      .addCase(createStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default staffSlice.reducer;
