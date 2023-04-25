import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";

import axios from "../../utils/axios";

export const fetchCharacterCreating = createAsyncThunk(
  "character/fetchCharacterCreating",
  async (params: FieldValues) => {
    await axios.post("/character", params);
  }
);

export const fetchCharacters = createAsyncThunk(
  "character/fetchCharacters",
  async () => {
    const { data } = await axios.get("/character");
    return data;
  }
);

export const fetchPopularCharacter = createAsyncThunk(
  "character/fetchPopularCharacter",
  async () => {
    const { data } = await axios.get("/character-popular");
    return data;
  }
);

export const fetchRemoveCharacter = createAsyncThunk(
  "character/fetchRemoveCharacter",
  async (id: any) => {
    axios.delete(`/character/${id}`);
  }
);

const initialState = {
  characters: {
    items: [],
    data: null,
    status: "loading",
  },
};

const characterSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //NewsCreating
    builder.addCase(fetchCharacterCreating.pending, (state) => {
      state.characters.status = "loading";
      state.characters.data = null;
    }),
      builder.addCase(fetchCharacterCreating.rejected, (state) => {
        state.characters.data = null;
        state.characters.status = "loading";
      });
    //getting news
    builder.addCase(fetchCharacters.pending, (state) => {
      state.characters.items = [];
      state.characters.status = "loading";
    }),
      builder.addCase(fetchCharacters.fulfilled, (state, action) => {
        state.characters.items = action.payload;
        state.characters.status = "loaded";
      }),
      builder.addCase(fetchCharacters.rejected, (state) => {
        state.characters.items = [];
        state.characters.status = "error";
      }),
      builder.addCase(fetchPopularCharacter.pending, (state) => {
        state.characters.items = [];
        state.characters.status = "loading";
      }),
      builder.addCase(fetchPopularCharacter.fulfilled, (state, action) => {
        state.characters.items = action.payload;
        state.characters.status = "loaded";
      }),
      builder.addCase(fetchPopularCharacter.rejected, (state) => {
        state.characters.items = [];
        state.characters.status = "error";
      });
    //deleting news
    builder.addCase(fetchRemoveCharacter.pending, (state, action) => {
      state.characters.items = state.characters.items.filter(
        (obj: any) => obj._id !== action.meta.arg
      );
    });
  },
});

export const characterReducer = characterSlice.reducer;
