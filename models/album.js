const album = (sequelize, DataTypes) => {
  const Album = sequelize.define(
    "album",
    {
      id: {
        field: "AlbumId",
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        field: "AlbumTitle",
        type: DataTypes.STRING
      }
    },
    { timestamps: false }
  );

  Album.associate = models => {
    Album.belongsTo(models.Artist, { foreignKey: "ArtistId" });
  };

  return Album;
};

module.exports = album;
