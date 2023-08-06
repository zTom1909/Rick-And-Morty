import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import DetailComponent from "../../components/DetailComponent";
import style from "./Detail.module.css"

const Detail = () => {
  const [character, setCharacter] = useState({});
  const { id } = useParams();
  useEffect(() => {
    axios(`http://localhost:3001/rickandmorty/character/${id}`)
      .then(({ data }) => {
        data.name
          ? setCharacter(data)
          : window.alert("No se pudo cargar este personaje");
      })
      .catch();
    return setCharacter({});
  }, [id]);

  return (
    <div className={style.container}>
      <DetailComponent
        key={character.id}
        id={character.id}
        name={character.name}
        status={character.status}
        species={character.species}
        gender={character.gender}
        origin={character.origin}
        image={character.image}
      />
    </div>
  );
};

export default Detail;
