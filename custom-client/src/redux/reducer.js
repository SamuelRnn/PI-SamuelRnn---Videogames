import { GET_ALL_GAMES, GET_ALL_GENRES, SET_ACTIVE_FILTERS } from "./actions";

const initialState = {
  games: [],
  genres: [],
  activeFilters: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_GAMES:
      return { ...state, games: action.payload }
    case GET_ALL_GENRES:
      return { ...state, genres: action.payload }
    case SET_ACTIVE_FILTERS:
      return { ...state, activeFilters: action.payload }
    default:
      return { ...state };
  }
};

export default reducer;
