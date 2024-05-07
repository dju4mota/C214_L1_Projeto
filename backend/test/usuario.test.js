const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../src/index");

require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(process.env.connection_url);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

  describe("POST /user", () => {
    it("should create a user", async () => {
      const res = await request(app).post("/usuario").send({
        nome: "dju", 
        login: "dju", 
        senha: "1234",
        listas: []
      });
      expect(res.statusCode).toBe(201);
    });
    it("should not create invalid user (name undefined)", async () => {
      const res = await request(app).post("/usuario").send({
          nome: undefined, 
          login: "dju", 
          senha: "1234",
          listas: []
      });
      expect(res.statusCode).toBe(400);
    });
    it("should not create invalid user (login undefined)", async () => {
      const res = await request(app).post("/usuario").send({
          nome: "dju", 
          login: undefined, 
          senha: "1234",
          listas: []
      });
      expect(res.statusCode).toBe(400);
    });
    it("should not create invalid user (password undefined)", async () => {
        const res = await request(app).post("/usuario").send({
            nome: "dju", 
            login: "dju", 
            senha: undefined,
            listas: []
        });
    expect(res.statusCode).toBe(400);
    });
})
