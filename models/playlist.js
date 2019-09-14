const playlist = (sequelize, DataTypes) => {
  const Playlist = sequelize.define(
    "playlist",
    {
      id: {
        field: "PlaylistId",
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        field: "PlaylistName",
        type: DataTypes.STRING
      }
    },
    { timestamps: false }
  );

  Playlist.associate = models => {
    Playlist.belongsToMany(models.Track, { 
      through: "playlist_track", 
      foreignKey: "PlaylistId", 
      timestamps: false 
    });
  };

  return Playlist;
};

module.exports = playlist;
