import { GET_ALL_GAMES, GET_ALL_GENRES } from "./actions";

const initialState = {
  games: [],
  genres: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_GAMES:
      return { ...state, games: action.payload }
    case GET_ALL_GENRES:
      return { ...state, genres: action.payload }
    default:
      return { ...state };
  }
};

export default reducer;
