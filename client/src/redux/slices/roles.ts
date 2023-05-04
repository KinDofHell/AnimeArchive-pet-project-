import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const fetchUserRoles = createAsyncThunk(
  "admin/fetchUserRoles",
  async () => {
    const { data } = await axios.get("/role");
    return data;
  }
);

const initialState = {
  roles: {
    items: [],
    status: "loading",
  },
};

const rolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserRoles.pending, (state) => {
      state.roles.items = [];
      state.roles.status = "loading";
    }),
      builder.addCase(fetchUserRoles.fulfilled, (state, action) => {
        state.roles.items = action.payload;
        state.roles.status = "loaded";
      }),
      builder.addCase(fetchUserRoles.rejected, (state) => {
        state.roles.items = [];
        state.roles.status = "error";
      });
  },
});

export const rolesReducer = rolesSlice.reducer;
