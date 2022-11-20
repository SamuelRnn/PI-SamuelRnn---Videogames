const getVideogames = require("./getVideogames");
const postCustomVideogame = require("./postCustomVideogame");
const getAllGenres = require("./getAllGenres");
const getGameDetail = require("./getGameDetail");
const getGameBySearch = require("./getGameBySearch");

module.exports = controllers = {
  getVideogames,
  postCustomVideogame,
  getAllGenres,
  getGameDetail,
  getGameBySearch,
};
