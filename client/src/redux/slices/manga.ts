import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const fetchManga = createAsyncThunk("manga/fetchManga", async () => {
  const { data } = await axios.get("/manga");
  return data;
});

export const fetchRecentManga = createAsyncThunk(
  "manga/fetchRecentManga",
  async () => {
    const { data } = await axios.get("/manga-recent");
    return data;
  }
);

export const fetchRemoveManga = createAsyncThunk(
  "manga/fetchRemoveManga",
  async (id: any) => {
    axios.delete(`/manga/${id}`);
  }
);

const initialState = {
  manga: {
    items: [],
    status: "loading",
  },
};

const mangaSlice = createSlice({
  name: "manga",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //getting manga
    builder.addCase(fetchManga.pending, (state) => {
      state.manga.items = [];
      state.manga.status = "loading";
    }),
      builder.addCase(fetchManga.fulfilled, (state, action) => {
        state.manga.items = action.payload;
        state.manga.status = "loaded";
      }),
      builder.addCase(fetchManga.rejected, (state) => {
        state.manga.items = [];
        state.manga.status = "error";
      }),
      builder.addCase(fetchRecentManga.pending, (state) => {
        state.manga.items = [];
        state.manga.status = "loading";
      }),
      builder.addCase(fetchRecentManga.fulfilled, (state, action) => {
        state.manga.items = action.payload;
        state.manga.status = "loaded";
      }),
      builder.addCase(fetchRecentManga.rejected, (state) => {
        state.manga.items = [];
        state.manga.status = "error";
      });
    //deleting manga
    builder.addCase(fetchRemoveManga.pending, (state, action) => {
      state.manga.items = state.manga.items.filter(
        (obj: any) => obj._id !== action.meta.arg
      );
    });
  },
});

export const mangaReducer = mangaSlice.reducer;
