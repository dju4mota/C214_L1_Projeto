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

  describe("POST /card", () => {
    it("should create a user", async () => {
      const res = await request(app).post("/usuario").send({
        nome: "dju", 
        login: "dju", 
        senha: "1234",
        listas: []
      });
      expect(res.statusCode).toBe(201);
      //expect(res.body.name).toBe("Teste");
    });
    it("should not create invalid card (name undefined)", async () => {
        const res = await request(app).post("/usuario").send({
            nome: undefined, 
            login: "dju", 
            senha: "1234",
            listas: []
        });
        expect(res.statusCode).toBe(400);
      });
      it("should not create invalid card (login undefined)", async () => {
        const res = await request(app).post("/usuario").send({
            nome: "dju", 
            login: undefined, 
            senha: "1234",
            listas: []
        });
        it("should not create invalid card (password undefined)", async () => {
            const res = await request(app).post("/usuario").send({
                nome: "dju", 
                login: "dju", 
                senha: undefined,
                listas: []
            });
        expect(res.statusCode).toBe(400);
      });
  });
});
