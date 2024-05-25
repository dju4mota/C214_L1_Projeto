jest.mock('../src/models/usuario.model');
const Usuario = require('../src/models/usuario.model');
const rotasUsuario = require('../src/routes/usuario.routes.js');
const httpMocks = require('node-mocks-http'); // biblioteca para mock de objetos req e res



describe('Usuario Routes', () => {
  describe('POST /usuario', () => {

    // variaveis para teste
    const newUser = {
      nome: 'dju4mota',
      login: 'dju4mota',
      senha: 'senha123',
    };
    const req = httpMocks.createRequest({
      method: 'POST',
      url: '/usuario',
      body: newUser
    });


    it('should create a card', async () => {
      
      Usuario.create.mockResolvedValue(newUser);
      
      const res = httpMocks.createResponse();
    
      await rotasUsuario.criarUsuario(req, res);
    
      expect(res.statusCode).toBe(201);
      expect(res._getData()).toEqual(newUser);
    });

    it('should create two Usuarios', async () => {
          
      Usuario.create.mockResolvedValue(newUser);
    
      const res = httpMocks.createResponse();
    
      await rotasUsuario.criarUsuario(req, res);
    
      expect(res.statusCode).toBe(201);
      expect(res._getData()).toEqual(newUser);
      await rotasUsuario.criarUsuario(req, res);
    
      expect(res.statusCode).toBe(201);
      expect(res._getData()).toEqual(newUser);
    });

    it('should not create invalid user (login undefined)', async () => {
      const cardInvalido = {
        nome: 'dju4mota',
        senha: 'senha123',
      };
      
      Usuario.create.mockResolvedValue(cardInvalido);
    
      req.body = cardInvalido
    
      const res = httpMocks.createResponse();
    
      await rotasUsuario.criarUsuario(req, res);
    
      expect(res.statusCode).toBe(400);
    });
    it('should not create invalid user (usuario undefined)', async () => {
      const cardInvalido = {
        nome: 'dju4mota',
        senha: 'senha123',
      };
    
      Usuario.create.mockResolvedValue(cardInvalido);
    
      req.body = cardInvalido
    
      const res = httpMocks.createResponse();
    
      await rotasUsuario.criarUsuario(req, res);
    
      expect(res.statusCode).toBe(400);
    });
  });
});