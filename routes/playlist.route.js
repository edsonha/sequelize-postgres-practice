const express = require("express");
const playlistRouter = express.Router();
const { Playlist, Track } = require("../models");
const Sequelize = require("sequelize");

const { Op } = Sequelize;

playlistRouter.get("/", async (req, res) => {
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

  const playlists = await Playlist.findAll(filter);
  res.json(playlists);
});

playlistRouter.get("/:id", async (req, res) => {
  let { id } = req.params;
  const playlist = await Playlist.findByPk(id, { include: [Track] });
  if (!playlist) {
    return res.status(404).send("Playlist not found");
  }
  res.json(playlist);
});

playlistRouter.put("/:id", async (req, res) => {
  let { id } = req.params;
  const playlist = await Playlist.findByPk(id);
  if (!playlist) {
    return res.status(404).send("Playlist not found");
  }
  const updatedPlaylist = await playlist.update(req.body);
  res.status(200).json(updatedPlaylist);
});

playlistRouter.delete("/:id", async (req, res) => {
  let { id } = req.params;
  const playlist = await Playlist.findByPk(id);
  if (!playlist) {
    return res.status(404).send("Playlist not found");
  }
  await playlist.destroy();
  res.status(200).send("Playlist is deleted");
});

//Another method to delete playlist in playlist_track then in playlist
// playlistRouter.delete("/:id", (req, res) => {
//   let { id } = req.params;
//   Playlist.findByPk(id)
//     .then(playlist => {
//       if (playlist) {
//         return playlist.setTracks([]).then(() => {
//           return playlist.destroy();
//         });
//       } else {
//         return Promise.reject();
//       }
//     })
//     .then(
//       () => {
//         res.status(200).send("Playlist is deleted");
//       },
//       () => {
//         res.status(404).send("Playlist is not found");
//       }
//     );
// });

module.exports = playlistRouter;
