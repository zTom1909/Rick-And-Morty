import { ADD_FAV, REMOVE_FAV, FILTER, ORDER } from "./types";

const initialState = {
  allCharacters: [],
  myFavorites: [],
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_FAV:
      const addedCharacter = [...state.allCharacters, payload];
      return {
        ...state,
        allCharacters: addedCharacter,
        myFavorites: addedCharacter,
      };
    case REMOVE_FAV:
      const removedCharacter = state.allCharacters.filter(
        ({ id }) => id !== Number(payload)
      );
      return {
        ...state,
        allCharacters: removedCharacter,
        myFavorites: removedCharacter,
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
    default:
      return state;
  }
};

export default reducer;
