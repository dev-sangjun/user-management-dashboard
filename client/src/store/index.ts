import { configureStore } from "@reduxjs/toolkit";
import entryReducer from "./entry.reducer";
import modalReducer from "./modal.reducer";
import userReducer from "./user.reducer";

export const store = configureStore({
  reducer: {
    entryReducer,
    modalReducer,
    userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
