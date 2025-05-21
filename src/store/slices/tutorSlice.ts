import { createSlice } from '@reduxjs/toolkit';
import { getTutor } from '../actions/tutorAction';

const tutorSlice = createSlice({
  name: 'tutor',
  initialState: {
    tutor: [],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //GET TUTOR
      .addCase(getTutor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTutor.fulfilled, (state, action) => {
        state.loading = false;
        state.tutor = action.payload;
      })
      .addCase(getTutor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
  },
});

export default tutorSlice.reducer;