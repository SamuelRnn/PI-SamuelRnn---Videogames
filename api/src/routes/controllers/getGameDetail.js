require('../../config')()

const axios = require("axios");
const { Videogame } = require("../../db");

const { API_KEY } = process.env;

const getGameDetail = async (id) => {
  const numericId = !isNaN(+id)
  if (numericId) {
    const apiUrl = `https://api.rawg.io/api/games/${id}?key=${API_KEY}`;
    const fetchedGame = await axios.get(apiUrl);
    return fetchedGame.data;
  }
  const detail = await Videogame.findOne({
    where: { id },
  });
  if (!detail) throw { message: "Not Found!" };
  return detail;
};

module.exports = getGameDetail;
