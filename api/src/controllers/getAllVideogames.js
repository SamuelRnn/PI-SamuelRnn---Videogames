require('dotenv').config()

const axios = require("axios").default;
const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;

const getVideogames = async () => {
  const customGames = await Videogame.findAll({
    include: Genre
  });

  let apiGames = [];
  let apiUrl = `https://api.rawg.io/api/games?key=${API_KEY}`;
  // gets the first 100 results, default page-size = 20 results
  let i = 0;
  while (i < 5) {
    const res = await axios.get(apiUrl, {
      headers: {
        "Accept-Encoding": "null",
      },    
    });
    const { data } = res;
    apiGames = apiGames.concat(data.results)
    apiUrl = data.next;
    i++;
  }
  //-----------------------------------------------------------

  return apiGames.concat(customGames)
};
module.exports = getVideogames;
