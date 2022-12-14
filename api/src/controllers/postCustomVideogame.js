const { Videogame } = require('../db');
const getAllGenres = require('./getAllGenres');

const postCustomVideogame = async (formData) => {
  //form default field_data = null
  const {
    name, description, released, rating, genres, platforms, background_image
  } = formData
  if(!name || !description || !platforms){
    throw {
      status: false,
      message: 'Missing required information.'
    }
  }

  const gameAlreadyExist = await Videogame.findOne({
    where:{ name }
  })
  if(gameAlreadyExist){
    throw {
      status: false,
      message: 'The game already exist! Choose another name.'
    }
  }
  const newGame = await Videogame.create({
    name, description, released, rating, platforms, background_image
  })
  const allGenres = await getAllGenres();
  const filteredGenres = genres.map(genre => (
    allGenres.find(g => g.id === genre)
  ))
  newGame.addGenres(filteredGenres)
  return {
    status: 'done',
    message: "New game added successfully!",
    game: newGame
  }
};

module.exports = postCustomVideogame;