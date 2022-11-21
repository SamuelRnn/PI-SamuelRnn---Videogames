require("../config")();
const controllers = require("../controllers");
const express = require("express");

const videogamesRouter = express.Router();

videogamesRouter
  .get("/", async (req, res) => {
    const { name, source } = req.query;
      if (name) {
        try {
        const data = await controllers.getGameBySearch(name);
        res.send(data);
        } catch (error) {
          res.status(404).send(error);
        }
      } else {
        try {
          const data = await controllers.getAllVideogames();
          res.send(data);
        } catch (error) {
          res.status(500).send(error)
        }
      }

  })
  .get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      res.send(await controllers.getGameDetail(id));
    } catch (error) {
      res.status(500).send(error);
    }
  })

  .post("/", async (req, res) => {
    const gameFormData = req.body;
    try {
      res.status(201).send(await controllers.postCustomVideogame(gameFormData));
    } catch (error) {
      res.status(400).send(error);
    }
  });

module.exports = videogamesRouter;
