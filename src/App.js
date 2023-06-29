import { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import About from "./views/About";
import Detail from "./views/Detail";
import Home from "./views/Home";
import Landing from "./views/Landing";

import Nav from "./components/Nav";

import "./App.css";

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [access, setAccess] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const EMAIL = "example@email.com";
  const PASSWORD = "example123";

  const onSearch = (id) => {
    axios(`https://rickandmortyapi.com/api/character/${id}`)
      .then(({ data }) => {
        if (!data.name)
          return window.alert("No se ha encontrado un personaje con esa ID.");

        const dupedCharacters = characters.filter(
          (character) => character.id === data.id
        );
        if (dupedCharacters.length > 0)
          return window.alert("You already have that character");

        setCharacters(() => [...characters, data]);
      })
      .catch(() =>
        window.alert("No se ha encontrado un personaje con esa ID.")
      );
  };

  const onClose = (id) => {
    const newCharactersList = characters.filter(
      (character) => character.id !== parseInt(id)
    );
    setCharacters(() => [...newCharactersList]);
  };

  const login = ({ email, password }) => {
    if (email === EMAIL && password === PASSWORD) {
      setAccess(true);
      navigate("/home");
    } else alert("Usuario o contraseña incorrectos");
  };

  const logout = () => {
    setAccess(false);
    navigate("/");
  };

  useEffect(() => {
    !access && navigate("/");
  }, [access, navigate]);

  return (
    <>
      {location.pathname !== "/" && <Nav onSearch={onSearch} logout={logout} />}
      <Routes>
        <Route path="/" element={<Landing login={login} />} />
        <Route
          path="/home"
          element={<Home characters={characters} onClose={onClose} />}
        />
        <Route
          path="/favorites"
          element={<Home characters={characters} onClose={onClose} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </>
  );
};

export default App;
