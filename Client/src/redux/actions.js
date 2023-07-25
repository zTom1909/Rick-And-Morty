import axios from "axios";
import { ADD_FAV, REMOVE_FAV, FILTER, ORDER } from "./types";

export const addFav = (character) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3001/rickandmorty/fav",
        character
      );

      return dispatch({
        type: ADD_FAV,
        payload: data,
      });
    } catch (error) {
      console.error(error.message);
    }
  };
};

export const removeFav = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:3001/rickandmorty/fav/${id}`
      );

      return dispatch({
        type: REMOVE_FAV,
        payload: data,
      });
    } catch (error) {
      console.error(error.message);
    }
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
