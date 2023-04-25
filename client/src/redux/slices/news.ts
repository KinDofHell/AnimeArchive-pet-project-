import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";

import axios from "../../utils/axios";

export const fetchNewsCreating = createAsyncThunk(
  "news/fetchNewsCreating",
  async (params: FieldValues) => {
    await axios.post("/news", params);
  }
);

export const fetchNews = createAsyncThunk("news/fetchNews", async () => {
  const { data } = await axios.get("/news");
  return data;
});

export const fetchRecentNews = createAsyncThunk(
  "news/fetchRecentNews",
  async () => {
    const { data } = await axios.get("/news-recent");
    return data;
  }
);

export const fetchRemoveNews = createAsyncThunk(
  "news/fetchRemoveNews",
  async (id: any) => {
    axios.delete(`/news/${id}`);
  }
);

const initialState = {
  news: {
    items: [],
    data: null,
    status: "loading",
  },
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //NewsCreating
    builder.addCase(fetchNewsCreating.pending, (state) => {
      state.news.status = "loading";
      state.news.data = null;
    }),
      builder.addCase(fetchNewsCreating.rejected, (state) => {
        state.news.data = null;
        state.news.status = "loading";
      });
    //getting news
    builder.addCase(fetchNews.pending, (state) => {
      state.news.items = [];
      state.news.status = "loading";
    }),
      builder.addCase(fetchNews.fulfilled, (state, action) => {
        state.news.items = action.payload;
        state.news.status = "loaded";
      }),
      builder.addCase(fetchNews.rejected, (state) => {
        state.news.items = [];
        state.news.status = "error";
      }),
      builder.addCase(fetchRecentNews.pending, (state) => {
        state.news.items = [];
        state.news.status = "loading";
      }),
      builder.addCase(fetchRecentNews.fulfilled, (state, action) => {
        state.news.items = action.payload;
        state.news.status = "loaded";
      }),
      builder.addCase(fetchRecentNews.rejected, (state) => {
        state.news.items = [];
        state.news.status = "error";
      });
    //deleting news
    builder.addCase(fetchRemoveNews.pending, (state, action) => {
      state.news.items = state.news.items.filter(
        (obj: any) => obj._id !== action.meta.arg
      );
    });
  },
});

export const newsReducer = newsSlice.reducer;
