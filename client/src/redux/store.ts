import thunkMiddleware from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";

import { animeReducer } from "./slices/anime";
import { categoriesReducer } from "./slices/category";
import { creatorsReducer } from "./slices/creators";
import { userReducer } from "./slices/user";
import { statusesReducer } from "./slices/status";
import { mangaReducer } from "./slices/manga";
import { newsReducer } from "./slices/news";
import { characterReducer } from "./slices/character";
import { adminInfoReducer } from "./slices/admin";
import { rolesReducer } from "./slices/roles";

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
