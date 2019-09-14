const app = require("../app");
const request = require("supertest");

describe("GET /artists", () => {
  it("should return all artists", async () => {
    const response = await request(app).get("/artists");
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject([
      { id: 1, name: "Queen" },
      { id: 2, name: "Metallica" },
      { id: 3, name: "Friends" }
    ]);
  });

  it("should return all artist starting with `M` when query paramater of M is passed", async () => {
    const response = await request(app).get("/artists?q=M");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ id: 2, name: "Metallica" }]);
  });

  it("should return one artist when search by id", async () => {
    const response = await request(app).get("/artists/3");
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: 3,
      name: "Friends"
    });
  });

  it("should return 404 status when search by id is not found", async () => {
    const response = await request(app).get("/artists/100");
    expect(response.status).toBe(404);
    expect(response.text).toBe("Artist not found");
  });
});

describe("POST /artists", () => {
  it("should create a new artist for valid input", async () => {
    const response = await request(app)
      .post("/artists")
      .set("Content-Type", "application/json")
      .send({ name: "New Artist" });
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ name: "New Artist" });
  });

  it("should throw error when name length is only 1", async () => {
    const response = await request(app)
      .post("/artists")
      .set("Content-Type", "application/json")
      .send({ name: "N" });
    expect(response.status).toBe(422);
    expect(response.body.errors[0].message).toBe(
      "Name must be between 2 and 10 characters"
    );
  });

  it("should throw error when no name is given", async () => {
    const response = await request(app)
      .post("/artists")
      .set("Content-Type", "application/json")
      .send({ name: "" });
    expect(response.status).toBe(422);
    expect(response.body.errors[0].message).toBe("Name is required");
    expect(response.body.errors[1].message).toBe(
      "Name must be between 2 and 10 characters"
    );
  });
});
