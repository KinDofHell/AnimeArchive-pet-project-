import thunkMiddleware from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";

import {
  adminInfoReducer,
  animeReducer,
  categoriesReducer,
  characterReducer,
  creatorsReducer,
  mangaReducer,
  newsReducer,
  rolesReducer,
  statusesReducer,
  userReducer,
} from "./slices/imports";

export const store = configureStore({
  reducer: {
    anime: animeReducer,
    manga: mangaReducer,
    categories: categoriesReducer,
    creators: creatorsReducer,
    statuses: statusesReducer,
    user: userReducer,
    news: newsReducer,
    characters: characterReducer,
    adminInfo: adminInfoReducer,
    roles: rolesReducer,
  },
  middleware: [thunkMiddleware],
});
