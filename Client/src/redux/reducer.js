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

const initialState = {
  allCards: [],
  allCharacters: [],
  myCards: [],
  myFavorites: [],
  email: "",
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_CARD:
      const allCards = [...state.myCards, payload];
      return { ...state, myCards: allCards, allCards };
    case REMOVE_CARD:
      if (payload === "*") return { ...state, myCards: [], allCards: [] };
      const removedCards = state.myCards.filter(
        (character) => character.id !== payload
      );
      return { ...state, myCards: removedCards, allCards: removedCards };
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
      const { gender } = payload;
      const charactersToFilter =
        payload.target === "myFavorites" ? state.allCharacters : state.allCards;
      const filteredCharacters =
        gender !== "noFilter"
          ? charactersToFilter.filter(
              (character) => character.gender === gender
            )
          : charactersToFilter;
      const saveFilterLocation =
        payload.target === "myFavorites"
          ? { myFavorites: filteredCharacters }
          : { myCards: filteredCharacters };
      return { ...state, ...saveFilterLocation };
    case ORDER:
      const { order } = payload;
      const charactersToOrder =
        payload.target === "myFavorites" ? state.allCharacters : state.allCards;
      const sortArrayById = (array, sortingOrder) =>
        // eslint-disable-next-line array-callback-return
        array.sort((a, b) => {
          if (sortingOrder === "A") return a.name.localeCompare(b.name);
          if (sortingOrder === "D") return b.name.localeCompare(a.name);
          return 0;
        });
      const sortedCharacters = sortArrayById(charactersToOrder, order);
      const saveOrderLocation =
        payload.target === "myFavorites"
          ? { myFavorites: sortedCharacters }
          : { myCards: sortedCharacters };
      return { ...state, ...saveOrderLocation };
    case ADD_EMAIL:
      return { ...state, email: payload };
    default:
      return state;
  }
};

export default reducer;
