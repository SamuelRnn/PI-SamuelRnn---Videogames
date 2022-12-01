require('dotenv').config()

const axios = require("axios");
const { Videogame, Genre } = require("../db");

const { API_KEY } = process.env;

const getGameDetail = async (id) => {
  const numericId = !isNaN(+id)
  if (numericId) {
    const fetchedGame = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
    return fetchedGame.data;
  }
  const detail = await Videogame.findOne({
    where: { id },
    include: Genre
  });
  if (!detail) throw { message: "Not Found!" };
  return detail;
};

module.exports = getGameDetail;
