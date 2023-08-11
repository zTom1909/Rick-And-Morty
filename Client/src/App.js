import { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

import { addEmail } from "./redux/actions";

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
  const dispatch = useDispatch()

  const hasCharacter = (id) => {
    return characters.some((character) => character.id === id);
  };

  const onSearch = async (input) => {
    try {
      const availableStatuses = ["alive", "dead", "unknown"];
      const availableGenders = ["female", "male", "genderless", "unknown"]; //This comes from the API, don't cancel me D:

      if (!isNaN(input)) {
        const { data } = await axios.get(
          `http://localhost:3001/rickandmorty/search?id=${input}`
        );
        if (!data.name) return window.alert("No characters found.");
        const dupedCharacters = characters.some(({ id }) => id === data.id);
        if (dupedCharacters)
          return window.alert("You already have that character.");
        setCharacters(() => [...characters, data]);
      } else {
        let baseURL = "http://localhost:3001/rickandmorty/search?";
        const inputWords = input.split(" ");

        const hasStatus = inputWords.find((word) =>
          availableStatuses.includes(word.toLowerCase())
        );
        const hasGender = inputWords.find((word) =>
          availableGenders.includes(word.toLowerCase())
        );

        if (hasStatus) baseURL += `status=${hasStatus}&`;
        if (hasGender) baseURL += `gender=${hasGender}&`;

        const filteredInputWords = inputWords.filter(
          (word) =>
            !availableStatuses.includes(word) &&
            !availableGenders.includes(word)
        );

        if (filteredInputWords.length)
          baseURL += `name=${filteredInputWords.join(" ")}&`;
        else return window.alert("No name specified.");

        const { data } = await axios.get(baseURL);
        //Temporarily using only the first available character
        const newCharacter = data[0];

        if (!newCharacter.name) return window.alert("No characters found.");
        const dupedCharacters = characters.some(
          ({ id }) => id === newCharacter.id
        );
        if (dupedCharacters)
          return window.alert("You already have that character.");
        setCharacters(() => [...characters, newCharacter]);
      }
    } catch (error) {
      console.log(error);
      window.alert("No se ha encontrado un personaje con esa ID.");
    }
  };

  const onClose = (id) => {
    const newCharactersList = characters.filter(
      (character) => character.id !== parseInt(id)
    );
    setCharacters(() => [...newCharactersList]);
  };

  const register = async ({ email, password }) => {
    try {
      await axios.post(`http://localhost:3001/rickandmorty/register/`, {
        email,
        password,
      });
      setAccess(true);
      navigate("/home");
      dispatch(addEmail(email))
    } catch (error) {
      alert(error.response.data.error);
      /*
       * error muestra la informacion del error que recibe el catch por parametro,
       * este error tiene la propiedad response.data que muestra la informacion que
       * devuelve el response (res.send(), res.json(), etc). En este caso, cuando
       * hay un error en el login se devuelve un objeto con la propiedad error con
       * el mensaje correspondiente, por eso accedemos al .error del response
       */
    }
  };

  const login = async ({ email, password }) => {
    try {
      await axios.get(
        `http://localhost:3001/rickandmorty/login/?email=${email}&password=${password}`
      );
      setAccess(true);
      navigate("/home");
      dispatch(addEmail(email))
    } catch (error) {
      setAccess(false);
      alert(error.response.data.error);
      /*
       * error muestra la informacion del error que recibe el catch por parametro,
       * este error tiene la propiedad response.data que muestra la informacion que
       * devuelve el response (res.send(), res.json(), etc). En este caso, cuando
       * hay un error en el login se devuelve un objeto con la propiedad error con
       * el mensaje correspondiente, por eso accedemos al .error del response
       */
    }
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
      {location.pathname !== "/" && !location.pathname.includes("/detail") && (
        <Nav hasCharacter={hasCharacter} onSearch={onSearch} logout={logout} />
      )}
      <Routes>
        <Route
          path="/"
          element={<Landing register={register} login={login} />}
        />
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
