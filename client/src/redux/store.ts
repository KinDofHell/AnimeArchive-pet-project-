import thunkMiddleware from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";

import { animeReducer } from "./slices/anime";
import { categoriesReducer } from "./slices/category";
import { creatorsReducer } from "./slices/creators";

export const store = configureStore({
  reducer: {
    anime: animeReducer,
    categories: categoriesReducer,
    creators: creatorsReducer,
  },
  middleware: [thunkMiddleware],
});
