import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import axios from "axios";

import { filterCards, getFav, orderCards } from "../../redux/actions";
import Card from "../Card";
import CustomDropdown from "../CustomDropdown";
import style from "./Cards.module.css";

const Cards = (props) => {
  const [selectedOrder, setSelectedOrder] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [myFavorites, setMyFavorites] = useState([]);

  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFav(props.email))
  }, [props.email, dispatch]);

  useEffect(() => {
    setMyFavorites(props.myFavorites);
  }, [props.myFavorites])

  const handleOrder = (value) => {
    dispatch(orderCards(value));
    setSelectedOrder(value);
  };
  const handleFilter = (value) => {
    dispatch(filterCards(value));
    setSelectedFilter(value);
  };

  return (
    <div className={style.containerGlobal}>
      {location.pathname === "/favorites" && (
        <div className={style.containerFilters}>
          <CustomDropdown
            options={[
              { value: "A", label: "Ascending" },
              { value: "D", label: "Descending" },
            ]}
            onChange={handleOrder}
            selectedValue={selectedOrder}
          />
          <CustomDropdown
            options={[
              { value: "noFilter", label: "No filters" },
              { value: "Male", label: "Male" },
              { value: "Female", label: "Female" },
              { value: "Genderless", label: "Genderless" },
              { value: "unknown", label: "Unknown" },
            ]}
            onChange={handleFilter}
            selectedValue={selectedFilter}
          />

          <button
            className={style.clear}
            onClick={() =>
              axios
                .delete(`http://localhost:3001/rickandmorty/fav/*?email=${props.email}`)
                .then(() => setMyFavorites([]))
            }
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      )}
      <div className={style.containerCards}>
        {location.pathname === "/favorites"
          ? myFavorites.map((character) => (
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
  email: state.email
});

export default connect(mapStateToProps, null)(Cards);
