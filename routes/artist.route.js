const express = require("express");
const artistRouter = express.Router();
const { Artist, Album } = require("../models");
const Sequelize = require("sequelize");

const { Op } = Sequelize;

artistRouter.get("/", async (req, res) => {
  let filter = {};
  let { q } = req.query;

  if (q) {
    filter = {
      where: {
        name: {
          [Op.like]: `${q}%`
        }
      }
    };
  }

  const artists = await Artist.findAll(filter);
  res.json(artists);
});

artistRouter.get("/:id", async (req, res) => {
  let { id } = req.params;
  const artist = await Artist.findByPk(id, { include: [Album] });
  if (!artist) {
    return res.status(404).send("Artist not found");
  }
  res.json(artist);
});

artistRouter.post("/", async (req, res) => {
  try {
    let { name } = req.body;
    const newArtist = await Artist.create({ name: name });
    res.json(newArtist);
  } catch (err) {
    res.status(422).json({
      errors: err.errors.map(error => {
        return {
          attribute: error.path,
          message: error.message
        };
      })
    });
  }
});

module.exports = artistRouter;
