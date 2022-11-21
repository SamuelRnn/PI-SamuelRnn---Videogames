require('../config')()

const axios = require("axios");
const { Videogame } = require("../db");
const { API_KEY } = process.env;

const getVideogames = async () => {
  const customGames = await Videogame.findAll();

  let apiGames = [];
  let apiUrl = `https://api.rawg.io/api/games?key=${API_KEY}`;
  // gets the first 100 results, default page-size = 20 results
  let i = 0;
  while (i < 5) {
    const res = await axios.get(apiUrl);
    const { data } = res;
    // apiGames = [...apiGames, ...data.results];
    apiGames = apiGames.concat(data.results)
    url = data.next;
    i++;
  }
  //-----------------------------------------------------------

  return {games: apiGames.concat(customGames)}
};
module.exports = getVideogames;
