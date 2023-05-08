import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";

import axios from "../../utils/axios";

export const fetchAnimeCreating = createAsyncThunk(
  "anime/fetchAnimeCreating",
  async (params: FieldValues) => {
    await axios.post("/anime", params);
  }
);

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

export const fetchRemoveAnime = createAsyncThunk(
  "anime/fetchRemoveAnime",
  async (id: any) => {
    await axios.delete(`/anime/${id}`);
  }
);

const initialState = {
  anime: {
    items: [],
    data: null,
    status: "loading",
  },
};

const animeSlice = createSlice({
  name: "anime",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //AnimeCreating
    builder.addCase(fetchAnimeCreating.pending, (state) => {
      state.anime.status = "loading";
      state.anime.data = null;
    }),
      builder.addCase(fetchAnimeCreating.rejected, (state) => {
        state.anime.data = null;
        state.anime.status = "loading";
      });
    //getting anime
    builder.addCase(fetchAnime.pending, (state) => {
      state.anime.items = [];
      state.anime.status = "loading";
    });
    builder.addCase(fetchAnime.fulfilled, (state, action) => {
      state.anime.items = action.payload;
      state.anime.status = "loaded";
    });
    builder.addCase(fetchAnime.rejected, (state) => {
      state.anime.items = [];
      state.anime.status = "error";
    });
    builder.addCase(fetchRecentAnime.pending, (state) => {
      state.anime.items = [];
      state.anime.status = "loading";
    });
    builder.addCase(fetchRecentAnime.fulfilled, (state, action) => {
      state.anime.items = action.payload;
      state.anime.status = "loaded";
    });
    builder.addCase(fetchRecentAnime.rejected, (state) => {
      state.anime.items = [];
      state.anime.status = "error";
    });
    //deleting anime
    builder.addCase(fetchRemoveAnime.pending, (state, action) => {
      state.anime.items = state.anime.items.filter(
        (obj: any) => obj._id !== action.meta.arg
      );
    });
  },
});

export const animeReducer = animeSlice.reducer;
