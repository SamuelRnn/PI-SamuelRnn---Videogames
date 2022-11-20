require('../config')()
const controllers = require("./controllers/index");
const express = require("express");

const videogamesRouter = express.Router();

videogamesRouter.get("/", async (req, res) => {
  const { name, source } = req.query;
  try {
    if (name) {
      const data = await controllers.getGameBySearch(name)
      res.send(data)
    } else if (source) {
      const data = await controllers.getVideogames(source);
      res.send(data);
    } else {
      const data = await controllers.getVideogames();
      res.send(data);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

videogamesRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    res.send(await controllers.getGameDetail(id));
  } catch (error) {
    res.status(400).send(error);
  }
});

//----------------POST----------------------
videogamesRouter.post("/", async (req, res) => {
  const gameInfo = req.body;
  try {
    res.send(await controllers.postCustomVideogame(gameInfo));
  } catch (error) {
    console.log(error)
    res.status(400).send(error);
  }
});

module.exports = videogamesRouter;
