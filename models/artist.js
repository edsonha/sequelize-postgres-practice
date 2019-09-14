const artist = (sequelize, DataTypes) => {
  const Artist = sequelize.define(
    "artist",
    {
      id: {
        field: "ArtistId",
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        field: "ArtistName",
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Name is required"
          },
          len: {
            args: [2, 10],
            msg: "Name must be between 2 and 10 characters"
          }
        }
      }
    },
    { timestamps: false }
  );

  Artist.associate = models => {
    Artist.hasMany(models.Album, { foreignKey: "ArtistId" });
  };

  return Artist;
};

module.exports = artist;
