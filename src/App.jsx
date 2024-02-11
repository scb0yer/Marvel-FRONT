import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faChevronRight,
  faChevronLeft,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

library.add(faChevronRight, faChevronLeft, faBars);

import Header from "./components/Header";
import CharactersPage from "./pages/CharactersPage";
import CharacterPage from "./pages/CharacterPage";
import ComicsPage from "./pages/ComicsPage";
import ComicPage from "./pages/ComicPage";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import FavouritesPage from "./pages/FavouritesPage";
import Menu from "./components/Menu";

import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [token, setToken] = useState("");
  const [signUpVisible, setSignUpVisible] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <Router className="relative">
      <Header
        search={search}
        setSearch={setSearch}
        signUpVisible={signUpVisible}
        loginVisible={loginVisible}
      />
      <Routes>
        <Route
          path="/"
          element={
            <CharactersPage
              search={search}
              setSearch={setSearch}
              setMenuVisible={setMenuVisible}
              menuVisible={menuVisible}
            />
          }
        />
        <Route
          path="/character/:id"
          element={
            <CharacterPage token={token} setLoginVisible={setLoginVisible} />
          }
        />
        <Route
          path="/comics"
          element={<ComicsPage setMenuVisible={setMenuVisible} />}
        />
        <Route
          path="/comic/:id"
          element={
            <ComicPage token={token} setLoginVisible={setLoginVisible} />
          }
        />
        <Route
          path="/user"
          element={
            <FavouritesPage
              token={token}
              setLoginVisible={setLoginVisible}
              setSignUpVisible={setSignUpVisible}
            />
          }
        />
      </Routes>
      {loginVisible && (
        <Login
          setLoginVisible={setLoginVisible}
          setSignUpVisible={setSignUpVisible}
          setToken={setToken}
        />
      )}
      {signUpVisible && (
        <SignUp
          setLoginVisible={setLoginVisible}
          setSignUpVisible={setSignUpVisible}
          setToken={setToken}
        />
      )}
      {menuVisible && (
        <Menu setMenuVisible={setMenuVisible} menuVisible={menuVisible} />
      )}
    </Router>
  );
}

export default App;
