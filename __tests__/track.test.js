const app = require("../app");
const request = require("supertest");

describe("GET /tracks", () => {
  it("should return all tracks", async () => {
    const response = await request(app).get("/tracks");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { id: 1, name: "Somewhere only we know" },
      { id: 2, name: "My Heart Will Go On" },
      { id: 3, name: "That Thing You Do" },
      { id: 4, name: "Mama" },
      { id: 5, name: "Scooobidooo" }
    ]);
  });

  it("should return one playlist when search by id", async () => {
    const response = await request(app).get("/tracks/2");
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ id: 2, name: "My Heart Will Go On" });
  });

  it("should return 404 status when search by id is not found", async () => {
    const response = await request(app).get("/tracks/100");
    expect(response.status).toBe(404);
    expect(response.text).toBe("Playlist not found");
  });
});
