require("dotenv").config();

const axios = require("axios");
const { Videogame } = require("../../db");
const { API_KEY } = process.env;

const getVideogames = async (sourceFilter = false) => {
  let games = [];
  let apiUrl = `https://api.rawg.io/api/games?key=${API_KEY}`;

  const customGames = await Videogame.findAll();
  
  if(sourceFilter === 'custom'){
    return { games: customGames }
  }  
  // gets the first 100 results, default page-size = 20 results
  let i = 0;
  while (i < 5) {
    const res = await axios.get(apiUrl);
    const { data } = res;
    games = [...games, ...data.results];
    url = data.next;
    i++;
  }
  //-----------------------------------------------------------
  if(sourceFilter === 'api'){
    return { games }
  }

  games = [...games, ...customGames]
  return { games };
};
module.exports = getVideogames;
