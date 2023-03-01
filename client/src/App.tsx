import "./App.scss";

import { Route, Routes } from "react-router-dom";

import Header from "./layouts/Header/Header";
import Home from "./pages/Home";
import Container from "./components/ui/container/Container";
import Anime from "./pages/Anime";
import MyAnime from "./pages/MyAnime";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/anime" element={<Anime />} />
          <Route path="/my-anime" element={<MyAnime />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
