import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import accountReducer from "../features/account/accountSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    account: accountReducer
  },
});