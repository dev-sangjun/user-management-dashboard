import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modal.reducer";
import userReducer from "./user.reducer";

export const store = configureStore({
  reducer: {
    modalReducer,
    userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
