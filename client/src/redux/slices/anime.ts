import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const fetchAnime = createAsyncThunk("anime/fetchAnime", async () => {
  const { data } = await axios.get("/anime");
  return data;
});

export const fetchRecentAnime = createAsyncThunk(
  "anime/fetchRecentAnime",
  async () => {
    const { data } = await axios.get("/anime-recent");
    return data;
  }
);

const initialState = {
  anime: {
    items: [],
    status: "loading",
  },
};

const animeSlice = createSlice({
  name: "anime",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAnime.pending, (state) => {
      state.anime.items = [];
      state.anime.status = "loading";
    }),
      builder.addCase(fetchAnime.fulfilled, (state, action) => {
        state.anime.items = action.payload;
        state.anime.status = "loaded";
      }),
      builder.addCase(fetchAnime.rejected, (state) => {
        state.anime.items = [];
        state.anime.status = "error";
      }),
      builder.addCase(fetchRecentAnime.pending, (state) => {
        state.anime.items = [];
        state.anime.status = "loading";
      }),
      builder.addCase(fetchRecentAnime.fulfilled, (state, action) => {
        state.anime.items = action.payload;
        state.anime.status = "loaded";
      }),
      builder.addCase(fetchRecentAnime.rejected, (state) => {
        state.anime.items = [];
        state.anime.status = "error";
      });
  },
});

export const animeReducer = animeSlice.reducer;
