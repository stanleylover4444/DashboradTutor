import { createSlice } from '@reduxjs/toolkit';
import { getAppointment } from '../actions/appointmentsAction';


const appointmentSlice = createSlice({
  name: 'appointment',
  initialState: {
    appointments: [],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET APPOINTMENT
      .addCase(getAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
      })
      .addCase(getAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // 


  },
});

export default appointmentSlice.reducer;