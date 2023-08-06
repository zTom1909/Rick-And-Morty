import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import DetailComponent from "../../components/DetailComponent";
import style from "./Detail.module.css";

const Detail = () => {
  const [character, setCharacter] = useState({});
  const { id } = useParams();

  const navigate = useNavigate();

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
      <button className={style.back} onClick={() => navigate(-1)}>
        <i className="fa-solid fa-reply"></i>
      </button>
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
