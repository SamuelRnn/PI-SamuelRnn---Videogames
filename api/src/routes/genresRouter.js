require("../config")();
const controllers = require("../controllers");
const express = require("express");

const genresRouter = express.Router();

genresRouter
  .get("/", async (req, res) => {
    try {
      res.send(await controllers.getAllGenres());
    } catch (error) {
      res.status(500).send(error)
    }
  });

module.exports = genresRouter;
