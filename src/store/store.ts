import { configureStore } from '@reduxjs/toolkit';
import userDetailsReducer from './userDetailsSlice';
import formSteperReducer from './formSteperSlice';

export const store = configureStore({
  reducer: {
    userDetails: userDetailsReducer,
    steps: formSteperReducer,
  },
});

export default store;
