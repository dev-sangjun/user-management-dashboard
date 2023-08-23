import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import entryAPI from "../api/entry.api";
import { IEntry, QueryType } from "../global/types";

interface EntryState {
  entries: IEntry[];
  selectedEntry?: IEntry;
}

const initialState: EntryState = {
  entries: [],
};

export const asyncFetchEntries = createAsyncThunk(
  "entry/asyncFetchEntries",
  async (query?: QueryType) => {
    const entries = await entryAPI.fetchEntry(query);
    return entries;
  }
);

const entrySlice = createSlice({
  name: "entry",
  initialState,
  reducers: {
    selectEntry: (state, action: PayloadAction<IEntry>) => {
      state.selectedEntry = action.payload;
    },
    deselectEntry: state => {
      state.selectedEntry = undefined;
    },
  },
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

export const getSelectedEntry = (state: RootState) =>
  state.entryReducer.selectedEntry;

export const { selectEntry } = entrySlice.actions;

export default entrySlice.reducer;
