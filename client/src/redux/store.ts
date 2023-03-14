import thunkMiddleware from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";

import { animeReducer } from "./slices/anime";

export const store = configureStore({
  reducer: {
    anime: animeReducer,
  },
  middleware: [thunkMiddleware],
});
