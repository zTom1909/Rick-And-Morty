import axios from "axios";
import {
  ADD_CARD,
  REMOVE_CARD,
  GET_FAV,
  ADD_FAV,
  REMOVE_FAV,
  FILTER,
  ORDER,
  ADD_EMAIL,
} from "./types";

export const addCard = (character) => ({
  type: ADD_CARD,
  payload: character,
});

export const removeCard = (id) => ({
  type: REMOVE_CARD,
  payload: id,
});

export const getFav = (email) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/rickandmorty/fav?email=${email}`
      );

      return dispatch({
        type: GET_FAV,
        payload: data,
      });
    } catch (error) {
      console.error(error.message);
    }
  };
};

export const addFav = (character, email) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        `http://localhost:3001/rickandmorty/fav?email=${email}`,
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

export const removeFav = (email, id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:3001/rickandmorty/fav/${id}?email=${email}`
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

export const filterCards = (gender, target = "myFavorites") => ({
  type: FILTER,
  payload: { target, gender },
});

export const orderCards = (order, target = "myFavorites") => ({
  type: ORDER,
  payload: { target, order },
});

export const addEmail = (email) => ({
  type: ADD_EMAIL,
  payload: email,
});
