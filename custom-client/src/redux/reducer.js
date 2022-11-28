import {
  GET_ALL_GAMES,
  GET_ALL_GENRES,
  SET_ACTIVE_FILTERS,
  TOGGLE_FILTER_MENU,
  SET_SEARCHED_GAMES,
  RESET_GAMES,
} from "./actions";

const initialState = {
  games: [],
  genres: [],
  activeFilters: false,
  filterMenuState: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_GAMES:
      return { ...state, games: action.payload };
    case GET_ALL_GENRES:
      return { ...state, genres: action.payload };
    case SET_ACTIVE_FILTERS:
      return { ...state, activeFilters: action.payload };
    case TOGGLE_FILTER_MENU:
      return { ...state, filterMenuState: !state.filterMenuState }
    case SET_SEARCHED_GAMES:
      return { ...state, games: action.payload }
    case RESET_GAMES:
      return { ...state, games: [] }
    default:
      return { ...state };
  }
};

export default reducer;
