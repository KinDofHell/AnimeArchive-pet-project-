import "./App.scss";

import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { fetchMe } from "./redux/slices/user";

import Header from "./layouts/Header";
import Content from "./components/Content";

import Home from "./pages/home/Home";
import Anime from "./pages/anime/Anime";
import ProductPage from "./pages/productPage/ProductPage";
import Manga from "./pages/manga/Manga";
import ProductForms from "./pages/anime/ProductForm";

// import CategoryAdding from "./pages/categories/CategoryAdding";
// import CreatorAdding from "./pages/creators/CreatorAdding";
// import AnimeAdding from "./pages/anime/AnimeAdding";
// import MangaAdding from "./pages/manga/MangaAdding";
// import StatusAdding from "./pages/statuses/StatusAdding";

import UserForms from "./pages/user/UserForms";

const App = () => {
  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(fetchMe());
  }, []);

  return (
    <div className="App">
      <Header />
      <Content>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/anime" element={<Anime isMyAnime={false} />} />
          <Route path="/my-anime-list/" element={<Anime isMyAnime={true} />} />
          <Route path="/anime/:id" element={<ProductPage isAnime={true} />} />
          <Route
            path="/anime-adding"
            element={<ProductForms isAnime={true} isEditing={false} />}
          />
          {/* <Route path="/anime/:id/edit" element={<AnimeAdding />} /> */}
          <Route path="/manga" element={<Manga isMyManga={false} />} />
          <Route path="/my-manga-list" element={<Manga isMyManga={true} />} />
          <Route path="/manga/:id" element={<ProductPage isAnime={false} />} />
          {/* <Route path="/manga-adding" element={<MangaAdding />} /> */}
          {/* <Route path="/manga/:id/edit" element={<MangaAdding />} /> */}
          {/* <Route path="/category-adding" element={<CategoryAdding />} /> */}
          {/* <Route path="/creator-adding" element={<CreatorAdding />} />
          <Route path="/status-adding" element={<StatusAdding />} /> */}
          <Route path="/register" element={<UserForms isRegister={true} />} />
          <Route path="/login" element={<UserForms isRegister={false} />} />
        </Routes>
      </Content>
    </div>
  );
};

export default App;
