const filterGames = (gamesArray, filters) => {
  if(filters.source === 'api'){
    gamesArray = gamesArray.filter(game => typeof +game.id === "number")
  }
  if(filters.source === 'custom'){
    gamesArray = gamesArray.filter(game => game.user_game === undefined)
  }
  if(filters.genre){
    gamesArray = gamesArray.filter(game => {
      const hasGenre = game.genres
        .map(genre => genre.id)
        .find(id => id == filters.genre)
      return !!hasGenre
    })
  }
  if(filters.order === 'ASC'){
    gamesArray = [...gamesArray].sort((a,b)=> a.name.localeCompare(b.name))
  }
  if(filters.order === 'DESC'){
    gamesArray = [...gamesArray].sort((a,b)=> b.name.localeCompare(a.name))
  }
  if(filters.order === 'WORST'){
    gamesArray = [...gamesArray].sort((a,b)=> a.rating - b.rating)
  }
  if(filters.order === 'BEST'){
    gamesArray = [...gamesArray].sort((a,b)=> b.rating - a.rating)
  }
  //desactivar el filtro no genera ningun efecto
  return gamesArray

};
export default filterGames;