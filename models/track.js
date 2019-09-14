const track = (sequelize, DataTypes) => {
  const Track = sequelize.define(
    "track",
    {
      id: {
        field: "TrackId",
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        field: "TrackName",
        type: DataTypes.STRING
      }
    },
    { timestamps: false }
  );

  Track.associate = models => {
    Track.belongsToMany(models.Playlist, {
      through: "playlist_track",
      foreignKey: "TrackId",
      timestamps: false
    });
  };

  return Track;
};

module.exports = track;
