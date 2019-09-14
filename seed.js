const { Playlist, Artist, Album, Track } = require("./models");

const seedDatabase = async () => {
  await Playlist.create({
    name: "Music",
    tracks: [{ name: "Somewhere only we know"}]
  }, 
   { include: [Track] }
  );

  await Playlist.create({
    name: "Movies",
    tracks: [ 
      {name: "My Heart Will Go On"},
      {name: "That Thing You Do"},
      {name: "Mama"}
    ]
  }, 
   { include: [Track] }
  );

  await Playlist.create({
    name: "TV Shows",
    tracks: [{ name: "Scooobidooo"}]
  }, 
   { include: [Track] }
  );

  await Artist.create(
    {
      name: "Queen",
      albums: [{ title: "Bohemian Rhapsody" }]
    },
    { include: [Album] }
  );

  await Artist.create(
    {
      name: "Metallica",
      albums: [
        { title: "Black Album" },
        { title: "ReLoad" },
        { title: "Ride The Lightning" }
      ]
    },
    { include: [Album] }
  );

  await Artist.create(
    {
      name: "Friends",
      albums: [{ title: "I Will Be There" }]
    },
    { include: [Album] }
  );
};

module.exports = seedDatabase;
