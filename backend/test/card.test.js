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
    it("should create a card", async () => {
      const res = await request(app).post("/card").send({
        estado: "Done", 
        nome: "Teste", 
        descricao: " ta testando",         
        usuario: "dju", 
        checklist: [],
      });
      expect(res.statusCode).toBe(201);
      //expect(res.body.name).toBe("Teste");
    });
    it("should not create invalid card (name undefined)", async () => {
        const res = await request(app).post("/card").send({
          estado: "Done",
          nome: undefined,            
          descricao: " ta testando",                 
          checklist: [],
        });
        expect(res.statusCode).toBe(400);
      });
      it("should not create invalid card (user undefined)", async () => {
        const res = await request(app).post("/card").send({
          estado: "Done",
          user: undefined,            
          descricao: " ta testando",                 
          checklist: [],
        });
        expect(res.statusCode).toBe(400);
      });
  });
