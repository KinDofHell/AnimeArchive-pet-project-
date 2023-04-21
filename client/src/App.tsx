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

import ProductForms from "./pages/productForm/ProductForm";
import UserForms from "./pages/user/UserForms";
import AddtionalProductForm from "./pages/addtionalProductForm/AdditionalProductForm";

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
          <Route
            path="/category-adding"
            element={<AddtionalProductForm type="category" isEditing={false} />}
          />
          <Route
            path="/creator-adding"
            element={<AddtionalProductForm type="creator" isEditing={false} />}
          />
          <Route
            path="/status-adding"
            element={<AddtionalProductForm type="status" isEditing={false} />}
          />
          <Route path="/register" element={<UserForms isRegister={true} />} />
          <Route path="/login" element={<UserForms isRegister={false} />} />
        </Routes>
      </Content>
    </div>
  );
};

export default App;
