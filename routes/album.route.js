const express = require("express");
const albumRouter = express.Router();
const { Artist, Album } = require("../models");
const Sequelize = require("sequelize");

const { Op } = Sequelize;

albumRouter.get("/", async (req, res) => {
  let filter = {};
  let { q } = req.query;

  if (q) {
    filter = {
      where: {
        title: {
          [Op.like]: `${q}%`
        }
      }
    };
  }

  const albums = await Album.findAll(filter);
  res.json(albums);
});

albumRouter.get("/:id", async (req, res) => {
  let { id } = req.params;
  const album = await Album.findByPk(id, { include: [Artist] });
  if (!album) {
    return res.status(404).send("Album not found");
  }
  res.json(album);
});

module.exports = albumRouter;
