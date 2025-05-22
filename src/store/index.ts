import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import staffReducer from './slices/staffSlice';
import customerReducer from './slices/customerSlice';
import tutorReducer from './slices/tutorSlice';
import appointmentReducer from './slices/appointmentSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    staff: staffReducer,
    customer: customerReducer,
    tutor : tutorReducer,
    appointment : appointmentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
