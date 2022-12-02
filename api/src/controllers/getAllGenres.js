require('dotenv').config()

const axios = require('axios')
const { Genre } = require('../db')

const {API_KEY} = process.env;

const getAllGenres = async () => {
  const storedGenres = await Genre.findAll() 
  if(storedGenres.length){
    return storedGenres
  }
  
  try {
    const res = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    const {results} = res.data
  
    console.log(results)
    
  } catch (error) {
    console.log(error)
    return error
  }
  // const genres = results.map(genre => ({
  //   id: genre.id,
  //   name : genre.name
  // }))
  // return await Genre.bulkCreate(genres)
};

module.exports = getAllGenres;