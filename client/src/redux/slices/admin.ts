import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const fetchAdminInfo = createAsyncThunk(
  "admin/fetchAdminInfo",
  async () => {
    const { data } = await axios.get("/admin-info");
    return data;
  }
);

export const fetchUserRoles = createAsyncThunk(
  "admin/fetchUserRoles",
  async () => {
    const { data } = await axios.get("/role");
    return data;
  }
);

const initialState = {
  adminInfo: {
    items: [],
    status: "loading",
  },
};

const adminInfoSlice = createSlice({
  name: "adminInfo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAdminInfo.pending, (state) => {
      state.adminInfo.items = [];
      state.adminInfo.status = "loading";
    }),
      builder.addCase(fetchAdminInfo.fulfilled, (state, action) => {
        state.adminInfo.items = action.payload;
        state.adminInfo.status = "loaded";
      }),
      builder.addCase(fetchAdminInfo.rejected, (state) => {
        state.adminInfo.items = [];
        state.adminInfo.status = "error";
      });
  },
});

export const adminInfoReducer = adminInfoSlice.reducer;
