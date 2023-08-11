import {
  GET_FAV,
  ADD_FAV,
  REMOVE_FAV,
  FILTER,
  ORDER,
  ADD_EMAIL,
} from "./types";

const initialState = {
  allCharacters: [],
  myFavorites: [],
  email: "",
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_FAV:
      return { ...state, myFavorites: payload, allCharacters: payload };
    case ADD_FAV:
      return {
        ...state,
        allCharacters: payload,
        myFavorites: payload,
      };
    case REMOVE_FAV:
      return {
        ...state,
        allCharacters: payload,
        myFavorites: payload,
      };
    case FILTER:
      const filteredCharacters =
        payload !== "noFilter"
          ? state.allCharacters.filter(
              (character) => character.gender === payload
            )
          : state.allCharacters;
      return { ...state, myFavorites: filteredCharacters };
    case ORDER:
      const sortArrayById = (array, sortingOrder) =>
        // eslint-disable-next-line array-callback-return
        array.sort((a, b) => {
          if (sortingOrder === "A") return a.name.localeCompare(b.name);
          if (sortingOrder === "D") return b.name.localeCompare(a.name);
          return 0;
        });

      const sortedCharacters = sortArrayById(state.allCharacters, payload);
      return { ...state, myFavorites: sortedCharacters };
    case ADD_EMAIL:
      return { ...state, email: payload };
    default:
      return state;
  }
};

export default reducer;
