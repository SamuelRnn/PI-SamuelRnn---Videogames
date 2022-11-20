require('../config')()
const express = require("express");
const genresRouter = express.Router();
const controllers = require('./controllers/index')

genresRouter.get("/", async (req, res) => {
  res.send(await controllers.getAllGenres());
});

module.exports = genresRouter;
