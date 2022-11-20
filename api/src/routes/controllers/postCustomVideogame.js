const { Videogame } = require('../../db');
const getAllGenres = require('./getAllGenres');

const postCustomVideogame = async (formData) => {
  const {
    name, description, released, rating, genres, platforms
  } = formData
  if(!name || !description || !platforms){
    throw new Error('La información requerida no fue enviada correctamente.')
  }

  const newGame = await Videogame.create({
    name, description, released, rating, platforms
  })
  const allGenres = await getAllGenres();
  const filteredGenres = genres.map(genre => (
    allGenres.find(g => g.name === genre)

  ))
  newGame.addGenres(filteredGenres)
  return {
    status: 'done',
    message: "Nuevo juego añadido correctamente!"
  }
};

module.exports = postCustomVideogame;