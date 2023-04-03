import thunkMiddleware from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";

import { animeReducer } from "./slices/anime";
import { categoriesReducer } from "./slices/category";
import { creatorsReducer } from "./slices/creators";
import { userReducer } from "./slices/user";
import { statusesReducer } from "./slices/status";

export const store = configureStore({
  reducer: {
    anime: animeReducer,
    categories: categoriesReducer,
    creators: creatorsReducer,
    statuses: statusesReducer,
    user: userReducer,
  },
  middleware: [thunkMiddleware],
});
