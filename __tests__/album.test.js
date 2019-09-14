const app = require("../app");
const request = require("supertest");
const { sequelize } = require("../models");
const seedDatabase = require("../seed");

beforeEach(async () => {
  await sequelize.sync({ force: true });
  await seedDatabase();
});

describe("GET /albums", () => {
  it("should return all albums", async () => {
    const response = await request(app).get("/albums");
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject([
      { id: 1, title: "Bohemian Rhapsody" },
      { id: 2, title: "Black Album" },
      { id: 3, title: "ReLoad" },
      { id: 4, title: "Ride The Lightning" },
      { id: 5, title: "I Will Be There" }
    ]);
  });

  it("should return all albums starting with `B` when query paramater of B is passed", async () => {
    const response = await request(app).get("/albums?q=B");
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject([
      { id: 1, title: "Bohemian Rhapsody" },
      { id: 2, title: "Black Album" }
    ]);
  });

  it("should return one album when search by id", async () => {
    const response = await request(app).get("/albums/3");
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: 3,
      title: "ReLoad"
    });
  });

  it("should return 404 status when search by id is not found", async () => {
    const response = await request(app).get("/albums/100");
    expect(response.status).toBe(404);
    expect(response.text).toBe("Album not found");
  });
});
