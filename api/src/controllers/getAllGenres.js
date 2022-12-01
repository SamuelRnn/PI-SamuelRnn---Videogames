require('dotenv').config()

const axios = require('axios')
const { Genre } = require('../db')

const {API_KEY} = process.env;
const apiUrl = `https://api.rawg.io/api/genres?key=${API_KEY}`;

const getAllGenres = async () => {
  const storedGenres = await Genre.findAll() 
  if(storedGenres.length){
    return storedGenres
  }
  const res = await axios.get(apiUrl)
  const {results} = res.data
  const genres = results.map(genre => ({
    id: genre.id,
    name : genre.name
  }))
  return await Genre.bulkCreate(genres)
};

module.exports = getAllGenres;