const app = require("../app");
const request = require("supertest");
const { sequelize } = require("../models");
const seedDatabase = require("../seed");

beforeEach(async () => {
  await sequelize.sync({ force: true });
  await seedDatabase();
});

describe("GET /playlists", () => {
  it("should return all playlist", async () => {
    const response = await request(app).get("/playlists");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { id: 1, name: "Music" },
      { id: 2, name: "Movies" },
      { id: 3, name: "TV Shows" }
    ]);
  });

  it("should return all playlist starting with `M` when query paramater of M is passed", async () => {
    const response = await request(app).get("/playlists?q=M");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { id: 1, name: "Music" },
      { id: 2, name: "Movies" }
    ]);
  });

  it("should return one playlist when search by id", async () => {
    const response = await request(app).get("/playlists/2");
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ id: 2, name: "Movies" });
  });

  it("should return 404 status when search by id is not found", async () => {
    const response = await request(app).get("/playlists/100");
    expect(response.status).toBe(404);
    expect(response.text).toBe("Playlist not found");
  });

  describe("DELETE /playlists/:id", () => {
    it("should delete playlist by its id when valid id is found", async () => {
      const response = await request(app).delete("/playlists/1");
      expect(response.status).toBe(200);
      expect(response.text).toBe("Playlist is deleted");
      const allPlaylist = await request(app).get("/playlists");
      expect(allPlaylist.body.length).toBe(2);
    });

    it("should return 404 error when playlist id is not found", async () => {
      const response = await request(app).delete("/playlists/4");
      expect(response.status).toBe(404);
      expect(response.text).toBe("Playlist not found");
    });
  });

  describe("PUT /playlists/:id", () => {
    it("should update playlist when valid id is found", async () => {
      const response = await request(app)
        .put("/playlists/1")
        .set("Content-Type", "application/json")
        .send({ name: "New Playlist" });
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ id: 1, name: "New Playlist" });
    });

    it("should return 404 error when playlist id is not found", async () => {
      const response = await request(app)
        .put("/playlists/5")
        .set("Content-Type", "application/json")
        .send({ name: "New Playlist" });
      expect(response.status).toBe(404);
      expect(response.text).toBe("Playlist not found");
    });
  });
});
