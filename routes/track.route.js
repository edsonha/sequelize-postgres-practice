const express = require("express");
const trackRouter = express.Router();
const { Playlist, Track } = require("../models");

trackRouter.get("/", async (req, res) => {
  const tracks = await Track.findAll();
  res.json(tracks);
});

trackRouter.get("/:id", async (req, res) => {
  let { id } = req.params;
  const track = await Track.findByPk(id, { include: [Playlist] });
  if (!track) {
    return res.status(404).send("Playlist not found");
  }
  res.json(track);
});

module.exports = trackRouter;
