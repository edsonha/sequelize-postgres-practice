const app = require("../app");
const request = require("supertest");

describe("GET /", () => {
  it("should return Hello world! Welcome to music API", async () => {
    const response = await request(app).get("/");
    expect(response.text).toBe("Hello world! Welcome to music API");
  });
});
