import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const fetchCreators = createAsyncThunk(
  "creators/fetchCreators",
  async () => {
    const { data } = await axios.get("/creator");
    return data;
  }
);

const initialState = {
  creators: {
    items: [],
    status: "loading",
  },
};

const creatorsSlice = createSlice({
  name: "creators",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCreators.pending, (state) => {
      state.creators.items = [];
      state.creators.status = "loading";
    }),
      builder.addCase(fetchCreators.fulfilled, (state, action) => {
        state.creators.items = action.payload;
        state.creators.status = "loaded";
      }),
      builder.addCase(fetchCreators.rejected, (state) => {
        state.creators.items = [];
        state.creators.status = "error";
      });
  },
});

export const creatorsReducer = creatorsSlice.reducer;
