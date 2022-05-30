import { configureStore } from "@reduxjs/toolkit";
import goalSlice from "../features/goal/goalSlice";
import authReducer from "./../features/auth/authSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    goal: goalSlice,
  },
});
