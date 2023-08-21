import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import { IEntry } from "../global/entity.types";
import entryAPI from "../api/entry.api";

interface EntryState {
  entries: IEntry[];
}

const initialState: EntryState = {
  entries: [],
};

export const asyncFetchEntries = createAsyncThunk(
  "entry/asyncFetchEntries",
  async () => {
    const entries = await entryAPI.fetchEntry();
    return entries;
  }
);

const entrySlice = createSlice({
  name: "entry",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      asyncFetchEntries.fulfilled,
      (state, action: PayloadAction<IEntry[]>) => {
        state.entries = action.payload;
      }
    );
  },
});

export const getEntries = (state: RootState) => state.entryReducer.entries;

export default entrySlice.reducer;
