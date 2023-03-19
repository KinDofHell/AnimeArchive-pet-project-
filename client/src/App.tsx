import "./App.scss";

import { Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { isAuthenticated, fetchMe } from "./redux/slices/user";

import Header from "./layouts/Header/Header";
import Home from "./pages/Home";
import Container from "./components/ui/container/Container";
import Anime from "./pages/anime/Anime";
import MyAnime from "./pages/anime/MyAnime";
import CategoryAdding from "./pages/categories/CategoryAdding";
import CreatorAdding from "./pages/creators/CreatorAdding";
import AnimeAdding from "./pages/anime/AnimeAdding";
import Register from "./pages/user/Register";
import Login from "./pages/user/Login";
import { useEffect } from "react";

const App = () => {
  const isAuth = useSelector(isAuthenticated);
  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(fetchMe());
  }, []);

  return (
    <div className="App">
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/anime" element={<Anime />} />
          <Route path="/anime-adding" element={<AnimeAdding />} />
          <Route path="/my-anime" element={<MyAnime />} />
          <Route path="/anime/:id/edit" element={<AnimeAdding />} />
          <Route path="/category-adding" element={<CategoryAdding />} />
          <Route path="/creator-adding" element={<CreatorAdding />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
