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

  const onSearch = async (id) => {
    try {
      const { data } = await axios(
        `http://localhost:3001/rickandmorty/character/${id}`
      );

      if (!data.name) return window.alert("No se ha encontrado un personaje con esa ID.");

      const dupedCharacters = characters.find(({ id }) => id === data.id);
      if (dupedCharacters) return window.alert("You already have that character");

      setCharacters(() => [...characters, data]);
    } catch (error) {
      window.alert("No se ha encontrado un personaje con esa ID.");
    }
  };

  const onClose = (id) => {
    const newCharactersList = characters.filter(
      (character) => character.id !== parseInt(id)
    );
    setCharacters(() => [...newCharactersList]);
  };

  const login = ({ email, password }) => {
    axios(
      `http://localhost:3001/rickandmorty/login/?email=${email}&password=${password}`
    ).then(({ data }) => {
      const { access } = data;
      setAccess(access);
      access ? navigate("/home") : alert("Usuario o contraseña incorrectos");
    });
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
      {location.pathname !== "/" && !location.pathname.includes("/detail") && <Nav onSearch={onSearch} logout={logout} />}
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
