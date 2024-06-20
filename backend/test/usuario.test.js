jest.mock('../src/models/usuario.model');
const Usuario = require('../src/models/usuario.model');
const rotasUsuario = require('../src/routes/usuario.routes.js');
const httpMocks = require('node-mocks-http'); // biblioteca para mock de objetos req e res



describe('Usuario Routes', () => {
  
  const newUser = {
    nome: 'dju4mota',
    login: 'dju4mota',
    senha: 'senha123',
  };
  const userInvalid = {
    nome: 'dju4mota',
    senha: 'senha123',
  };

  describe('POST /usuario', () => {

    // variaveis para teste

    const req = httpMocks.createRequest({
      method: 'POST',
      url: '/usuario',
      body: newUser
    });


    it('should create a user', async () => {
      
      Usuario.create.mockResolvedValue(newUser);
      
      const res = httpMocks.createResponse();
    
      await rotasUsuario.criarUsuario(req, res);
    
      expect(res.statusCode).toBe(201);
      //expect(res._getData()).toEqual(newUser);
    });

    it('should create two users', async () => {
          
      Usuario.create.mockResolvedValue(newUser);
    
      const res = httpMocks.createResponse();
    
      await rotasUsuario.criarUsuario(req, res);
    
      expect(res.statusCode).toBe(201);      
      await rotasUsuario.criarUsuario(req, res);    
      expect(res.statusCode).toBe(201);      
    });

    it('should not create invalid user (login undefined)', async () => {

      
      Usuario.create.mockResolvedValue(userInvalid);
    
      req.body = userInvalid
    
      const res = httpMocks.createResponse();
    
      await rotasUsuario.criarUsuario(req, res);
    
      expect(res.statusCode).toBe(400);
    });
    it('should not create invalid user (usuario undefined)', async () => {
    
      Usuario.create.mockResolvedValue(userInvalid);
    
      req.body = userInvalid
    
      const res = httpMocks.createResponse();
    
      await rotasUsuario.criarUsuario(req, res);
    
      expect(res.statusCode).toBe(400);
    });

    it('should return a 500 status when an error occurs', async () => {
      Usuario.create.mockRejectedValue(new Error('Test error'));
  
      const res = httpMocks.createResponse();
      req.body = newUser
  
      await rotasUsuario.criarUsuario(req, res);
  
      expect(res.statusCode).toBe(500);
      expect(res._getData()).toEqual( "{\"error\":\"Erro interno de servidor\"}");
    });

  });
  
  describe('GET /usuario', () => {

    const reqAll = httpMocks.createRequest({
      method: 'GET',
      url: '/usuario/buscarTodos',
    });

    const req = httpMocks.createRequest({
      method: 'GET',
      url: '/usuario/',
    });


    it('should list all users', async () => {
    
      const UserList = [
        {
          nome: 'Test User',
          login: 'Test Login',
          senha: '1234',
          listas: []
        },
        {
          nome: 'Test User 2',
          login: 'Test Login 2',
          senha: '123467',
          listas: []
        },
      ];
      
      Usuario.find.mockResolvedValue(UserList);  
    
      const res = httpMocks.createResponse();
    
      await rotasUsuario.buscarTodos(reqAll, res);
    
      expect(res.statusCode).toBe(200);
      expect(res._getData()).toEqual("[{\"nome\":\"Test User\",\"login\":\"Test Login\",\"listas\":[]},{\"nome\":\"Test User 2\",\"login\":\"Test Login 2\",\"listas\":[]}]");
    });

    it('should list one user', async () => {
    
      const user = 
        {
          nome: 'Test User',
          login: 'Test Login',
          senha: '1234',
          listas: []
        }
      
      Usuario.findById.mockResolvedValue(user);  
    
      const res = httpMocks.createResponse();
    
      await rotasUsuario.buscarUsuario(req, res);
    
      expect(res.statusCode).toBe(200);
      expect(res._getData()).toEqual("{\"nome\":\"Test User\",\"login\":\"Test Login\",\"listas\":[]}");
    });
    it('should list one user', async () => {
         
      Usuario.findById.mockResolvedValue();  
    
      const res = httpMocks.createResponse();
    
      await rotasUsuario.buscarUsuario(req, res);
    
      expect(res.statusCode).toBe(404);
      expect(res._getData()).toEqual("{\"error\":\"Usuário não encontrado\"}");
    });

    it('should return a 500 status when an error occurs - all', async () => {
      Usuario.find.mockRejectedValue(new Error('Test error'));
  
      const res = httpMocks.createResponse();
  
      await rotasUsuario.buscarTodos(reqAll, res);
  
      expect(res.statusCode).toBe(500);
      expect(res._getData()).toEqual( "{\"error\":\"Erro interno de servidor\"}");
    });

    it('should return a 500 status when an error occurs', async () => {
      Usuario.findById.mockRejectedValue(new Error('Test error'));
  
      const res = httpMocks.createResponse();
  
      await rotasUsuario.buscarUsuario(req, res);
  
      expect(res.statusCode).toBe(500);
      expect(res._getData()).toEqual( "{\"error\":\"Erro interno de servidor\"}");
    });

  });
  
  describe('UPDATE /usuario', () => {
    const updatedUsuario = {
      nome: 'dju4mota 2',
      login: 'dju4mota 2',
      senha: 'senha123 2',
    };

    const req = httpMocks.createRequest({
      method: 'PUT',
      url: '/usuario/',
      body: updatedUsuario,
    });

    it('should edit a user', async () => {
      
      Usuario.findById.mockResolvedValue(newUser);
      Usuario.findByIdAndUpdate.mockResolvedValue(updatedUsuario);
  
      const res = httpMocks.createResponse();
      req.body = {senha: newUser.senha}
  
      await rotasUsuario.editarUsuario(req, res);
  
      expect(res.statusCode).toBe(200);      
      //expect(JSON.parse(res._getData())).toEqual(updatedUsuario);

    });

    it('should not edit a user - invalid password', async () => {
      
      Usuario.findById.mockResolvedValue(newUser);
      Usuario.findByIdAndUpdate.mockResolvedValue(updatedUsuario);
  
      const res = httpMocks.createResponse();
      req.body = "23982103"
  
      await rotasUsuario.editarUsuario(req, res);
  
      expect(res.statusCode).toBe(400);      
      expect(res._getData()).toEqual("{\"error\":\"Senha incorreta\"}");
      
    });

    it('should not edit a Usuario, Usuario not found', async () => {
      
      Usuario.findById.mockResolvedValue();
  
      const res = httpMocks.createResponse();
  
      await rotasUsuario.editarUsuario(req, res);
  
      expect(res.statusCode).toBe(404);      
      expect(res._getData()).toEqual( "{\"error\":\"Usuário não encontrado\"}");  

    });

    it('should return a 500 status when an error occurs', async () => {
      Usuario.findById.mockRejectedValue(new Error('Test error'));
  
      const res = httpMocks.createResponse();

      await rotasUsuario.editarUsuario(req, res);
      expect(res.statusCode).toBe(500);
      expect(res._getData()).toEqual( "{\"error\":\"Erro interno de servidor\"}");
    });
  });

  describe('DELETE /usuario', () => {
    
    const req = httpMocks.createRequest({
      method: 'DELETE',
      url: '/usuario/',
      body: newUser,
    });
    
    it('should delete a user', async () => {

      Usuario.findByIdAndDelete.mockResolvedValue(newUser);
    
      const res = httpMocks.createResponse();

      await rotasUsuario.excluirUsuario(req, res);

      expect(res.statusCode).toBe(200);
      expect(res._getData()).toEqual("{\"message\":\"Usuário excluído com sucesso\"}");
    });

    it('should not delete a user, user not found', async () => {
      
      Usuario.findByIdAndDelete.mockResolvedValue();

      const res = httpMocks.createResponse();

      await rotasUsuario.excluirUsuario(req, res);

      expect(res.statusCode).toBe(404);      
      expect(res._getData()).toEqual( "{\"error\":\"Usuário não encontrado\"}");  

    });

    it('should return a 500 status when an error occurs', async () => {
      Usuario.findByIdAndDelete.mockRejectedValue(new Error('Test error'));

      const res = httpMocks.createResponse();

      await rotasUsuario.excluirUsuario(req, res);
      expect(res.statusCode).toBe(500);
      expect(res._getData()).toEqual( "{\"error\":\"Erro interno de servidor\"}");
    });

  });

});