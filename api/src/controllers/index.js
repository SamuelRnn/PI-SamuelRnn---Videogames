const getAllVideogames = require("./getAllVideogames");
const postCustomVideogame = require("./postCustomVideogame");
const getAllGenres = require("./getAllGenres");
const getGameDetail = require("./getGameDetail");
const getGameBySearch = require("./getGameBySearch");

module.exports = controllers = {
  getAllVideogames,
  postCustomVideogame,
  getAllGenres,
  getGameDetail,
  getGameBySearch,
};
