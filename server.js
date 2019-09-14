const app = require("./app");
const { sequelize } = require("./models");
const port = 3000;
const seedDatabase = require("./seed");

const eraseDatabaseOnSync = true;

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    seedDatabase();
  }

  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});
