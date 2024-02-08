import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
library.add(faChevronRight, faChevronLeft);

import Header from "./components/Header";
import CharactersPage from "./pages/CharactersPage";
import CharacterPage from "./pages/CharacterPage";
import ComicsPage from "./pages/ComicsPage";
import ComicPage from "./pages/ComicPage";

import "./App.css";

function App() {
  const [search, setSearch] = useState("");

  return (
    <Router>
      <Header search={search} setSearch={setSearch} />
      <Routes>
        <Route
          path="/"
          element={<CharactersPage search={search} setSearch={setSearch} />}
        />
        <Route path="/character/:id" element={<CharacterPage />} />
        <Route
          path="/comics"
          element={<ComicsPage search={search} setSearch={setSearch} />}
        />
        <Route path="/comic/:id" element={<ComicPage />} />
      </Routes>
    </Router>
  );
}

export default App;
