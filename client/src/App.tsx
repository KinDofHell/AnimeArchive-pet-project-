import "./App.scss";

import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { fetchMe } from "./redux/slices/user";

import Header from "./layouts/Header";
import Content from "./components/Content";

import Home from "./pages/home/Home";

import ProductListPage from "./pages/productListPage/ProductListPage";
import ProductPage from "./pages/productPage/ProductPage";
import CharactersPage from "./pages/characters/CharactersPage";
import CharacterPage from "./pages/characters/CharacterPage";
import NewsListPage from "./pages/news/NewsListPage";
import NewsPage from "./pages/news/NewsPage";

import ProductForms from "./pages/productForm/ProductForm";
import UserForms from "./pages/user/UserForms";
import AdditionalProductForm from "./pages/addtionalProductForm/AdditionalProductForm";
import CharacterFormPage from "./pages/characterFormPage/CharacterFormPage";

import MasterPage from "./pages/masterPage/MasterPage";
import NewsAdding from "./pages/news/NewsAdding";

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
          {/* anime */}
          <Route
            path="/anime"
            element={<ProductListPage isMyList={false} isAnime={true} />}
          />
          <Route
            path="/my-anime-list/"
            element={<ProductListPage isMyList={true} isAnime={true} />}
          />
          <Route path="/anime/:id" element={<ProductPage isAnime={true} />} />
          <Route
            path="/anime-adding"
            element={<ProductForms isAnime={true} isEditing={false} />}
          />
          <Route
            path="/anime/:id/edit"
            element={<ProductForms isAnime={true} isEditing={true} />}
          />
          {/* manga */}
          <Route
            path="/manga"
            element={<ProductListPage isMyList={false} isAnime={false} />}
          />
          <Route
            path="/my-manga-list"
            element={<ProductListPage isMyList={true} isAnime={false} />}
          />
          <Route path="/manga/:id" element={<ProductPage isAnime={false} />} />
          <Route
            path="/manga-adding"
            element={<ProductForms isAnime={false} isEditing={false} />}
          />
          <Route
            path="/manga/:id/edit"
            element={<ProductForms isAnime={false} isEditing={true} />}
          />
          {/* category */}
          <Route
            path="/category-adding"
            element={
              <AdditionalProductForm type="category" isEditing={false} />
            }
          />
          {/* creator */}
          <Route
            path="/creator-adding"
            element={<AdditionalProductForm type="creator" isEditing={false} />}
          />
          {/* status */}
          <Route
            path="/status-adding"
            element={<AdditionalProductForm type="status" isEditing={false} />}
          />
          {/* character */}
          <Route path="/characters" element={<CharactersPage />} />
          <Route path="/character/:id" element={<CharacterPage />} />
          <Route
            path="/character-adding"
            element={<CharacterFormPage isEditing={false} />}
          />
          <Route
            path="/character/:id/edit"
            element={<CharacterFormPage isEditing={true} />}
          />
          {/* news */}
          <Route path="/news" element={<NewsListPage />} />
          <Route path="/news/:id" element={<NewsPage />} />
          <Route
            path="/news-adding"
            element={<NewsAdding isEditing={false} />}
          />
          <Route
            path="/news/:id/edit"
            element={<NewsAdding isEditing={true} />}
          />
          {/* login and register */}
          <Route path="/register" element={<UserForms isRegister={true} />} />
          <Route path="/login" element={<UserForms isRegister={false} />} />
          {/* for admins */}
          <Route path="/master-page" element={<MasterPage />} />
        </Routes>
      </Content>
    </div>
  );
};

export default App;
