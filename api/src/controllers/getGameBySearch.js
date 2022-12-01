require('dotenv').config()

const axios = require("axios");
const { Op } = require("sequelize");
const { Videogame } = require("../db");

const { API_KEY } = process.env;

const getGameBySearch = async (search) => {
  const apiUrl = `https://api.rawg.io/api/games?search=${search}&key=${API_KEY}`;
  const res = await axios.get(apiUrl);
  const apiGames = res.data;
  const customGames = await Videogame.findAll({
    where: {
      name: {
        [Op.iLike]: `%${search}`,
      },
    },
  });
  if (!apiGames.results.length && !customGames.length) {
    throw {
      status: false,
      message: 'Not Found!'
    }
  }
  return [...customGames, ...apiGames .results].slice(0, 15)
};
module.exports = getGameBySearch;
