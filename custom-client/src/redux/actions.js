import services from '../services';

export const GET_ALL_GAMES = 'GET_ALL_GAMES';
export const GET_ALL_GENRES = 'GET_ALL_GENRES';

export const getAllGames = () => {
  return function (dispatch){
    services.getGames()
      .then(data => dispatch({
        type: GET_ALL_GAMES,
        payload: data
      }));
  };
};
export const getAllGenres = () => {
  return function(dispatch){
    services.getGenres()
      .then(data => dispatch({
        type: GET_ALL_GENRES,
        payload: data
      }))
  }
};