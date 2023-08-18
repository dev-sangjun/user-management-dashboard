import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import userAPI from "../api/user.api";

interface UserState {
  userId: string | null;
}

const initialState: UserState = {
  userId: null,
};

export const asyncFetchUser = createAsyncThunk(
  "user/asyncFetchUser",
  async () => {
    const user = await userAPI.fetchUser();
    return user.id;
  },
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asyncFetchUser.fulfilled, (state, action) => {
      state.userId = action.payload;
    });
  },
});

export const getUser = (state: RootState) => state.userReducer;

export default userSlice.reducer;
