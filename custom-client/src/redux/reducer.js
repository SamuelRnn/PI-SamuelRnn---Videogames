import { GET_ALL_GAMES } from "./actions";

const initialState = {
  games: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_GAMES:
      return { ...state, games: action.payload }
    default:
      return { ...state };
  }
};

export default reducer;
