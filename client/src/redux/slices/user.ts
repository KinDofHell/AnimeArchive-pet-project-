import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { FieldValues } from "react-hook-form";

export const fetchLogin = createAsyncThunk(
  "login/fetchLogin",
  async (params: FieldValues) => {
    const { data } = await axios.post("/login", params);
    return data;
  }
);

export const fetchRegister = createAsyncThunk(
  "login/fetchRegister",
  async (params: FieldValues) => {
    await axios.post("/register", params);
  }
);

export const fetchMe = createAsyncThunk("auth/fetchMe", async () => {
  const { data } = await axios.get("/profile");
  return data;
});

const initialState = {
  data: null,
  status: "loading",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    //register
    builder.addCase(fetchRegister.pending, (state) => {
      state.status = "loading";
      state.data = null;
    }),
      builder.addCase(fetchRegister.rejected, (state) => {
        state.data = null;
        state.status = "error";
      });
    //login
    builder.addCase(fetchLogin.pending, (state) => {
      state.status = "loading";
      state.data = null;
    }),
      builder.addCase(fetchLogin.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "loaded";
      }),
      builder.addCase(fetchLogin.rejected, (state) => {
        state.data = null;
        state.status = "error";
      });
    //profile
    builder.addCase(fetchMe.pending, (state) => {
      state.status = "loading";
      state.data = null;
    }),
      builder.addCase(fetchMe.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "loaded";
      }),
      builder.addCase(fetchMe.rejected, (state) => {
        state.data = null;
        state.status = "error";
      });
  },
});

export const isAuthenticated = (state: any) => state.user.data;
export const isProductModerator = (state: any) => {
  if (state.user.data) {
    if (
      state.user.data.role === "productModerator" ||
      state.user.data.role === "admin"
    )
      return true;
    else return false;
  }
};

export const userReducer = userSlice.reducer;
export const { logout } = userSlice.actions;
