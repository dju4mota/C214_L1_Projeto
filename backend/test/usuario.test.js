jest.mock('../src/models/usuario.model');
const Usuario = require('../src/models/usuario.model');
const rotasUsario = require('../src/routes/usuario.routes.js');
const httpMocks = require('node-mocks-http'); // biblioteca para mock de objetos req e res


describe('Testes unitarios das rotas usuario ', () => {
  describe('POST /usuario', () => {
    it('should create a user', async () => {
      const newUser = {
        nome: 'Test user',
        login: 'Test User',
        senha: '123456',
      };
    
      Usuario.create.mockResolvedValue({newUser, id:1});
    
      const req = httpMocks.createRequest({
        method: 'POST',
        url: '/usario',
        body: newUser,
      });
    
      const res = httpMocks.createResponse();
    
      await rotasUsario.criarUsuario(req, res);
    
      expect(res.statusCode).toBe(201);
      expect(res._getData()).toEqual("{\"id\":1}");
    });
  });
});


    // it("should not create invalid card (name undefined)", async () => {
    //     const res = await request(app).post("/card").send({
    //       estado: "Done",
    //       nome: undefined,            
    //       descricao: " ta testando",                 
    //       checklist: [],
    //     });
    //     expect(res.statusCode).toBe(400);
    //   });
    //   it("should not create invalid card (user undefined)", async () => {
    //     const res = await request(app).post("/card").send({
    //       estado: "Done",
    //       user: undefined,            
    //       descricao: " ta testando",                 
    //       checklist: [],
    //     });
    //     expect(res.statusCode).toBe(400);
    //   });
//   });

//   describe("GET /card/listar", () => {
//     it("should list a card", async () => {
//       const res = await request(app).get("/card/listar")
//       expect(res.statusCode).toBe(200);
//       expect(res.body).toBe([])
//     });

