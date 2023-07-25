import axios from "axios";
import { ADD_FAV, REMOVE_FAV, FILTER, ORDER } from "./types";

export const addFav = (character) => {
  return (dispatch) => {
    axios
      .post("http://localhost:3001/rickandmorty/fav", character)
      .then(({ data }) => {
        return dispatch({
          type: ADD_FAV,
          payload: data,
        });
      });
  };
};

export const removeFav = (id) => {
  return (dispatch) => {
    axios
      .delete(`http://localhost:3001/rickandmorty/fav/${id}`)
      .then(({ data }) => {
        return dispatch({
          type: REMOVE_FAV,
          payload: data,
        });
      });
  };
};

export const filterCards = (gender) => ({
  type: FILTER,
  payload: gender,
});

export const orderCards = (order) => ({
  type: ORDER,
  payload: order,
});
