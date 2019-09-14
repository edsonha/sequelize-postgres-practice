const express = require("express");
const app = express();
const playlistRouter = require("./routes/playlist.route");
const trackRouter = require("./routes/track.route");
const artistRouter = require("./routes/artist.route");
const albumRouter = require("./routes/album.route");

app.use(express.json());

app.get("/", (req, res) => res.send("Hello world! Welcome to music API"));
app.use("/playlists", playlistRouter);
app.use("/tracks", trackRouter);
app.use("/artists", artistRouter);
app.use("/albums", albumRouter);

module.exports = app;
