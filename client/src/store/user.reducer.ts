import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import userAPI from "../api/user.api";
import { CustomFields } from "../global/types";

interface UserState {
  userId: string | null;
  customFields?: CustomFields;
}

const initialState: UserState = {
  userId: null,
};

export const asyncFetchUser = createAsyncThunk(
  "user/asyncFetchUser",
  async () => {
    const user = await userAPI.fetchUser();
    return user;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(asyncFetchUser.fulfilled, (state, action) => {
      state.userId = action.payload.id;
      state.customFields = action.payload.customFields;
    });
  },
});

export const getUser = (state: RootState) => state.userReducer;

export default userSlice.reducer;
