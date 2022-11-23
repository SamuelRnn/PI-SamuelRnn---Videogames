import services from '../services';

export const GET_ALL_GAMES = 'GET_ALL_GAMES';

export const getAllGames = () => {
  return function (dispatch){
    services.getGames()
      .then(data => dispatch({
        type: GET_ALL_GAMES,
        payload: data
      }))
    
  }
}