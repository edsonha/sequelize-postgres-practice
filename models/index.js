const Sequelize = require("sequelize");
require("dotenv").config();

sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: "postgres"
  }
);

const models = {
  Playlist: sequelize.import("./playlist"),
  Artist: sequelize.import("./artist"),
  Album: sequelize.import("./album"),
  Track: sequelize.import("./track")
};

Object.keys(models).forEach(key => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

module.exports = { sequelize, ...models };
