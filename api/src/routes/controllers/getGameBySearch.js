require('../../config')()

const axios = require("axios");
const { Op } = require("sequelize");
const { Videogame } = require("../../db");

const { API_KEY } = process.env;

const getGameBySearch = async (search) => {
  const apiUrl = `https://api.rawg.io/api/games?search=${search}&key=${API_KEY}`;
  const res = await axios.get(apiUrl);
  const data = res.data;

  const customGames = await Videogame.findAll({
    where: {
      name: {
        [Op.iLike]: `%${search}`,
      },
    },
  });
  return [...customGames, ...data.results].slice(0, 15)
};
module.exports = getGameBySearch;
