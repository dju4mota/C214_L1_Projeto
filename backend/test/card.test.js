jest.mock('../src/models/card.model');
jest.mock('../src/models/usuario.model');
const e = require('express');
const User = require('../src/models/usuario.model');
const rotasCard = require('../src/routes/cards.routes.js');
const httpMocks = require('node-mocks-http'); // biblioteca para mock de objetos req e res


describe('Testes unitarios das rotas card ', () => {
  
  describe('POST /card', () => {

    // variaveis para teste
    const newCard = {
      nome: 'Test Card',
      usuario: 'Test User',
      estado: 'Done',
    };
    const req = httpMocks.createRequest({
      method: 'POST',
      url: '/card',
      body: newCard,
      query: {
        nomeLista: 'Lista de teste'
      }
    });

    it('should create a card', async () => {
      
      User.findById.mockResolvedValue({
        nome: 'Test User',
        listas: [
          {
            nome: 'Lista de teste',
            cards: []
          }
        ]
      });

      User.findByIdAndUpdate.mockResolvedValue({
        nome: 'Test User',
        listas: [
          {
            nome: 'Lista de teste',
            cards: [newCard]
          }
        ]
      });
      
      const res = httpMocks.createResponse();
    
      await rotasCard.criarCard(req, res);
    
      expect(res.statusCode).toBe(201);
      expect(res._getData()).toEqual([{cards:[{estado:"Done",nome:"Test Card",usuario:"Test User"}],nome:"Lista de teste"}]);
    });

    it('should create a card, with To Do as state', async () => {
      
      newCard.estado = "To Do"

      User.findById.mockResolvedValue({
        nome: 'Test User',
        listas: [
          {
            nome: 'Lista de teste',
            cards: []
          }
        ]
      });

      User.findByIdAndUpdate.mockResolvedValue({
        nome: 'Test User',
        listas: [
          {
            nome: 'Lista de teste',
            cards: [newCard]
          }
        ]
      });
      
      const res = httpMocks.createResponse();
    
      await rotasCard.criarCard(req, res);
    
      expect(res.statusCode).toBe(201);
      expect(res._getData()).toEqual([{cards:[{estado:"To Do",nome:"Test Card",usuario:"Test User"}],nome:"Lista de teste"}]);
    });

    it('should create two cards', async () => {
          
      User.findById.mockResolvedValue({
        nome: 'Test User',
        listas: [
          {
            nome: 'Lista de teste',
            cards: []
          }
        ]
      });

      User.findByIdAndUpdate.mockResolvedValue({
        nome: 'Test User',
        listas: [
          {
            nome: 'Lista de teste',
            cards: [newCard]
          }
        ]
      });
    
      const res = httpMocks.createResponse();
    
      await rotasCard.criarCard(req, res);
    
      expect(res.statusCode).toBe(201);
      expect(res._getData()).toEqual([{cards:[{estado:"To Do",nome:"Test Card",usuario:"Test User"}],nome:"Lista de teste"}]);
      await rotasCard.criarCard(req, res);
    
      expect(res.statusCode).toBe(201);
      expect(res._getData()).toEqual([{cards:[{estado:"To Do",nome:"Test Card",usuario:"Test User"}],"nome": "Lista de teste"}]);
    });

    it('should not create invalid card (nome undefined)', async () => {
      const cardInvalido = {
        nome: 'Test Card',
        estado: 'Done',
      };
          
      req.body = cardInvalido
    
      const res = httpMocks.createResponse();
    
      await rotasCard.criarCard(req, res);
    
      expect(res.statusCode).toBe(400);
      expect(res._getData()).toEqual( "{\"error\":\"Informe o id do usuário, o nome da lista e o nome do card que deseja criar\"}");
    });

    it('should not create invalid card (usuario undefined)', async () => {
      const cardInvalido = {
        nome: 'Test Card',
        estado: 'Done',
      };
    
      req.body = cardInvalido
    
      const res = httpMocks.createResponse();
    
      await rotasCard.criarCard(req, res);
    
      expect(res.statusCode).toBe(400);
      expect(res._getData()).toEqual( "{\"error\":\"Informe o id do usuário, o nome da lista e o nome do card que deseja criar\"}");
    });

    it('should not create invalid card (nome da lista undefined)', async () => {
      const cardInvalido = {
        nome: 'Test Card',
        usuario: 'Test User',
        estado: 'Done',
      };
    
      req.body = cardInvalido
      req.query = {}
    
      const res = httpMocks.createResponse();
    
      await rotasCard.criarCard(req, res);
    
      expect(res.statusCode).toBe(400);
      expect(res._getData()).toEqual( "{\"error\":\"Informe o id do usuário, o nome da lista e o nome do card que deseja criar\"}");
      
      req.query = {
        nomeLista: 'Lista de teste'
      }

    });

    it('should return a 500 status when an error occurs', async () => {
      User.findById.mockRejectedValue(new Error('Test error'));
  
      const res = httpMocks.createResponse();
      req.body = newCard

      await rotasCard.criarCard(req, res);
  
      expect(res.statusCode).toBe(500);
      expect(res._getData()).toEqual( "{\"error\":\"Erro interno de servidor\"}");
    });

  });

  describe('GET /card', () => {
    const req = httpMocks.createRequest({
      method: 'GET',
      url: '/card/listar/123',
      params: {
        idUsuario: '123'
      },
      query: {
        nomeLista: 'Lista de teste'
      }
    });

    it('should list cards', async () => {
      
      const user = {
        nome: 'Test User',
        listas: [
          {
            nome: 'Lista de teste',
            cards: [
              {
                nome: 'Test Card',
                usuario: 'Test User',
                estado: 'Done',
              },
              {
                nome: 'Test Card 2',
                usuario: 'Test User 2',
                estado: 'Done',
              },
            ]
          }
        ]
      }

      User.findById.mockResolvedValue(user);
    
      const res = httpMocks.createResponse();
    
      await rotasCard.listarCards(req, res);
    
      expect(res.statusCode).toBe(200);
      expect(res._getData()).toEqual("[{\"nome\":\"Test Card\",\"usuario\":\"Test User\",\"estado\":\"Done\"},{\"nome\":\"Test Card 2\",\"usuario\":\"Test User 2\",\"estado\":\"Done\"}]");
    });

    it('should return a 500 status when an error occurs', async () => {
      User.findById.mockRejectedValue(new Error('Test error'));
  
      const res = httpMocks.createResponse();
  
      await rotasCard.listarCards(req, res);
  
      expect(res.statusCode).toBe(500);
      expect(res._getData()).toEqual( "{\"error\":\"Erro interno de servidor\"}");
    });
  });

  describe('UPDATE /card', () => {
    const updatedCard = {
      nome: 'Updated Card',
      usuario: 'Updated User',
      estado: 'Done',
    };
    const req = httpMocks.createRequest({
      method: 'PUT',
      url: '/card/',
      body: updatedCard,
      query: {
        nomeLista: 'Lista de teste'
      }
    });

    it('should edit a card', async () => {
      
      User.findById.mockResolvedValue({
        nome: 'Test User',
        listas: [
          {
            nome: 'Lista de teste',
            cards: [
              {
                nome: 'Test Card',
                usuario: 'Test User',
                estado: 'Done',
              }
            ]
          }
        ]
      });
      
      User.findByIdAndUpdate.mockResolvedValue({
        nome: 'Test User',
        listas: [
          {
            nome: 'Lista de teste',
            cards: [updatedCard]
          }
        ]
      });

      const res = httpMocks.createResponse();
  
      await rotasCard.editarCard(req, res);
  
      expect(res.statusCode).toBe(200);      
      expect(res._getData()).toEqual([{cards:[{estado:"Done",nome:"Updated Card",usuario:"Updated User"}],nome:"Lista de teste"}]);
    });

    it('should not edit a card, card not found', async () => {
      
      User.findById.mockResolvedValue({
        nome: 'Test User',
        listas: [
          {
            nome: 'Lista de teste',
            cards: []
          }
        ]
      });

      User.findByIdAndUpdate.mockResolvedValue({
        nome: 'Test User',
        listas: [
          {
            nome: 'Lista de teste',
            cards: []
          }
        ]
      });
    
      const res = httpMocks.createResponse();
  
      await rotasCard.editarCard(req, res);
  
      expect(res.statusCode).toBe(200);
      expect(res._getData()).toEqual([{cards:[],nome:"Lista de teste"}]);
    });

    it('should return a 500 status when an error occurs', async () => {
  
      User.findById.mockRejectedValue(new Error('Test error'));
      const res = httpMocks.createResponse();

      await rotasCard.editarCard(req, res);
      expect(res.statusCode).toBe(500);
      expect(res._getData()).toEqual( "{\"error\":\"Erro interno de servidor\"}");
    });

  });

  describe('DELETE /card', () => {
    const deletedCard = {
      nome: 'Deleted Card',
      usuario: 'Deleted User',
      estado: 'Done',
    };
    const req = httpMocks.createRequest({
      method: 'DELETE',
      url: '/card/',
      body: deletedCard,
      query: {
        nomeLista: 'Lista de teste'
      }
    });
    
    it('should delete a card', async () => {
  
      User.findById.mockResolvedValue({
        nome: 'Test User',
        listas: [
          {
            nome: 'Lista de teste',
            cards: [
              {
                nome: 'Deleted Card',
                usuario: 'Deleted User',
                estado: 'Done',
              }
            ]
          }
        ]
      });

      User.findByIdAndUpdate.mockResolvedValue({
        nome: 'Test User',
        listas: [
          {
            nome: 'Lista de teste',
            cards: []
          }
        ]
      });

      const res = httpMocks.createResponse();
  
      await rotasCard.excluirCard(req, res);
  
      expect(res.statusCode).toBe(200);
      expect(res._getData()).toEqual("{\"message\":\"Card excluído com sucesso\"}");
    });

    it('should not delete a card, card not found', async () => {
      
      User.findById.mockResolvedValue({
        nome: 'Test User',
        listas: [
          {
            nome: 'Lista de teste',
            cards: []
          }
        ]
      });

      User.findByIdAndUpdate.mockResolvedValue({
        nome: 'Test User',
        listas: [
          {
            nome: 'Lista de teste',
            cards: []
          }
        ]
      });
  
      const res = httpMocks.createResponse();
  
      await rotasCard.excluirCard(req, res);
  
      expect(res.statusCode).toBe(200);      
      expect(res._getData()).toEqual("{\"message\":\"Card excluído com sucesso\"}");  
    });

    it('should return a 500 status when an error occurs', async () => {
      
      User.findById.mockRejectedValue(new Error('Test error'));
      
      const res = httpMocks.createResponse();

      await rotasCard.excluirCard(req, res);
      expect(res.statusCode).toBe(500);
      expect(res._getData()).toEqual( "{\"error\":\"Erro interno de servidor\"}");
    });
  });
});



