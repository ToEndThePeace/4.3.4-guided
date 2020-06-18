const server = require("./server");
const request = require("supertest");
const db = require("../data/dbConfig");
const supertest = require("supertest");

describe("server.js", () => {
  it("should use the testing environment", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });
  beforeEach(async () => {
    await db("hobbits").truncate();
  });
  describe("GET /", () => {
    it("should return 200 OK", () => {
      return request(server)
        .get("/")
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });
    it("should return the correct test message", () => {
      return request(server)
        .get("/")
        .then((res) => {
          expect(res.body.api).toBe("up");
          expect(res.body).toEqual({ api: "up" });
        });
    });
    it("should return JSON", () => {
      return request(server)
        .get("/")
        .then((res) => {
          expect(res.type).toMatch(/json/i);
        });
    });
  });
  describe("POST /hobbits", () => {
    it("should save the new hobbit", () => {
      const name = "Bilbo";
      return request(server)
        .post("/hobbits")
        .send({ name })
        .then((res) => {
          expect(res.body.name).toBe(name);
        });
    });
    it("should add multiple hobbits", async () => {
      const hobbits = [{ name: "Gaffer" }, { name: "Frodo" }];
      await request(server).post("/hobbits").send(hobbits);
      let allHobbits = await request(server).get("/hobbits");
      expect(allHobbits.body).toHaveLength(2);
      await supertest(server).post("/hobbits").send({
        name: "Rose",
      });
      allHobbits = await request(server).get("/hobbits");
      expect(allHobbits.body).toHaveLength(3);
    });
  });
});
