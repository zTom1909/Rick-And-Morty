import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Card from "../../components/Card";

const Detail = () => {
  const [character, setCharacter] = useState({});
  const { id } = useParams();
  useEffect(() => {
    /* axios(`https://rickandmortyapi.com/api/character/${id}`) */
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
    <div>
      <Card
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
