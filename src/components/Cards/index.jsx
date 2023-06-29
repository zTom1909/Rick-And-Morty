import { useState } from "react";
import { useLocation } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { filterCards, orderCards } from "../../redux/actions";
import Card from "../Card";
import style from "./Cards.module.css";

const Cards = (props) => {
  const [aux, setAux] = useState(false);

  const location = useLocation();
  const dispatch = useDispatch();

  const handleOrder = (event) => {
    dispatch(orderCards(event.target.value));
    setAux(!aux);
  };
  const handleFilter = (event) => {
    dispatch(filterCards(event.target.value));
    setAux(!aux);
  };

  return (
    <div className={style.containerGlobal}>
      {location === "/favorites" &&
        <div className={style.containerFilter}>
        <select name="order" onChange={handleOrder}>
          <option value="A">Ascendente</option>
          <option value="D">Descendente</option>
        </select>
        <select name="filter" onChange={handleFilter}>
          <option value="noFilter">No filters</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Genderless">Genderless</option>
          <option value="unknown">unknown</option>
        </select>
      </div>
      }
      <div className={style.containerCards}>
        {location.pathname === "/favorites"
          ? props.myFavorites.map((character) => (
              <Card
                key={character.id}
                id={character.id}
                name={character.name}
                status={character.status}
                species={character.species}
                gender={character.gender}
                origin={character.origin}
                image={character.image}
                onClose={props.onClose}
              />
            ))
          : props.characters.map((character) => (
              <Card
                key={character.id}
                id={character.id}
                name={character.name}
                status={character.status}
                species={character.species}
                gender={character.gender}
                origin={character.origin}
                image={character.image}
                onClose={props.onClose}
              />
            ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  myFavorites: state.myFavorites,
});

export default connect(mapStateToProps, null)(Cards);
