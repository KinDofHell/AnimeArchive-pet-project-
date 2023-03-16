import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const { data } = await axios.get("/category");
    return data;
  }
);

const initialState = {
  categories: {
    items: [],
    status: "loading",
  },
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.categories.items = [];
      state.categories.status = "loading";
    }),
      builder.addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories.items = action.payload;
        state.categories.status = "loaded";
      }),
      builder.addCase(fetchCategories.rejected, (state) => {
        state.categories.items = [];
        state.categories.status = "error";
      });
  },
});

export const categoriesReducer = categoriesSlice.reducer;
