import "./App.scss";

import { Route, Routes } from "react-router-dom";

import Header from "./layouts/Header/Header";
import Home from "./pages/Home";
import Container from "./components/ui/container/Container";
import Anime from "./pages/anime/Anime";
import MyAnime from "./pages/anime/MyAnime";
import CategoryAdding from "./pages/categories/CategoryAdding";
import CreatorAdding from "./pages/creators/CreatorAdding";
import AnimeAdding from "./pages/anime/AnimeAdding";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/anime" element={<Anime />} />
          <Route path="/category-adding" element={<CategoryAdding />} />
          <Route path="/creator-adding" element={<CreatorAdding />} />
          <Route path="/anime-adding" element={<AnimeAdding />} />
          <Route path="/my-anime" element={<MyAnime />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
