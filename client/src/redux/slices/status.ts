import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const fetchStatuses = createAsyncThunk(
  "statuses/fetchStatuses",
  async () => {
    const { data } = await axios.get("/status");
    return data;
  }
);

const initialState = {
  statuses: {
    items: [],
    status: "loading",
  },
};

const statusesSlice = createSlice({
  name: "statuses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStatuses.pending, (state) => {
      state.statuses.items = [];
      state.statuses.status = "loading";
    }),
      builder.addCase(fetchStatuses.fulfilled, (state, action) => {
        state.statuses.items = action.payload;
        state.statuses.status = "loaded";
      }),
      builder.addCase(fetchStatuses.rejected, (state) => {
        state.statuses.items = [];
        state.statuses.status = "error";
      });
  },
});

export const statusesReducer = statusesSlice.reducer;
