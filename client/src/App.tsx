import "./App.scss";

import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { fetchMe } from "./redux/slices/user";

import Header from "./layouts/Header/Header";
import Container from "./components/ui/container/Container";

import Home from "./pages/Home";
import Anime from "./pages/anime/Anime";
import MyAnime from "./pages/anime/MyAnime";
import AnimePage from "./pages/anime/Animepage";

import CategoryAdding from "./pages/categories/CategoryAdding";
import CreatorAdding from "./pages/creators/CreatorAdding";
import AnimeAdding from "./pages/anime/AnimeAdding";

import Register from "./pages/user/Register";
import Login from "./pages/user/Login";

const App = () => {
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
          <Route path="/anime" element={<Anime isMyAnime={false} />} />
          <Route path="/my-anime" element={<Anime isMyAnime={true} />} />
          <Route path="/anime/:id" element={<AnimePage />} />
          <Route path="/anime-adding" element={<AnimeAdding />} />
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
