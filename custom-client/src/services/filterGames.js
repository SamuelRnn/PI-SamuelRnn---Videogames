const filterGames = (gamesArray, filters) => {
  if(filters.source === 'api'){
    gamesArray = gamesArray.filter(game => game.user_game === null)
  }
  if(filters.source === 'custom'){
    gamesArray = gamesArray.filter(game => game.user_game === undefined)
  }
  if(filters.genre){
    gamesArray = gamesArray.filter(game => {
      const hasGenre = game.genres
        .map(genre => genre.id)
        .find(id => id == filters.genre)
      return hasGenre ? true : false 
    })
  }
  return gamesArray

};
export default filterGames;