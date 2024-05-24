jest.mock('../src/models/card.model');
const Card = require('../src/models/card.model');
const rotasCard = require('../src/routes/cards.routes.js');
const httpMocks = require('node-mocks-http'); // biblioteca para mock de objetos req e res


describe('Testes unitarios das rotas card ', () => {
  describe('POST /card', () => {
    it('should create a card', async () => {
      const newCard = {
        nome: 'Test Card',
        usuario: 'Test User',
        estado: 'Done',
        // outros campos do card
      };
    
      Card.create.mockResolvedValue(newCard);
    
      const req = httpMocks.createRequest({
        method: 'POST',
        url: '/card',
        body: newCard,
      });
    
      const res = httpMocks.createResponse();
    
      await rotasCard.criarCard(req, res);
    
      expect(res.statusCode).toBe(201);
      expect(res._getData()).toEqual(newCard);
    });
    it('should create two cards', async () => {
      const newCard = {
        nome: 'Test Card',
        usuario: 'Test User',
        estado: 'Done',
        // outros campos do card
      };
    
      Card.create.mockResolvedValue(newCard);
    
      const req = httpMocks.createRequest({
        method: 'POST',
        url: '/card',
        body: newCard,
      });
    
      const res = httpMocks.createResponse();
    
      await rotasCard.criarCard(req, res);
    
      expect(res.statusCode).toBe(201);
      expect(res._getData()).toEqual(newCard);
      await rotasCard.criarCard(req, res);
    
      expect(res.statusCode).toBe(201);
      expect(res._getData()).toEqual(newCard);
    });
    it('should not create invalid card (nome undefined)', async () => {
      const newCard = {
        nome: 'Test Card',
        estado: 'Done',
      };
    
      Card.create.mockResolvedValue(newCard);
    
      const req = httpMocks.createRequest({
        method: 'POST',
        url: '/card',
        body: newCard,
      });
    
      const res = httpMocks.createResponse();
    
      await rotasCard.criarCard(req, res);
    
      expect(res.statusCode).toBe(400);
    });
    it('should not create invalid card (usuario undefined)', async () => {
      const newCard = {
        usuario: 'usuario teste',
        estado: 'Done',
      };
    
      Card.create.mockResolvedValue(newCard);
    
      const req = httpMocks.createRequest({
        method: 'POST',
        url: '/card',
        body: newCard,
      });
    
      const res = httpMocks.createResponse();
    
      await rotasCard.criarCard(req, res);
    
      expect(res.statusCode).toBe(400);
    });
  });

  describe('GET /card', () => {
    it('should list cards', async () => {
    
      const cardList = [
        {
          nome: 'Test Card',
          usuario: 'Test User',
          estado: 'Done',
          // outros campos do card
        },
        {
          nome: 'Test Card 2',
          usuario: 'Test User 2',
          estado: 'Done',
          // outros campos do card
        },
      ];
      
      Card.find.mockResolvedValue(cardList);
    
      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/card/listar',
      });
    
      const res = httpMocks.createResponse();
    
      await rotasCard.listarCards(req, res);
    
      expect(res.statusCode).toBe(200);
      expect(res._getData()).toEqual("[{\"nome\":\"Test Card\",\"usuario\":\"Test User\",\"estado\":\"Done\"},{\"nome\":\"Test Card 2\",\"usuario\":\"Test User 2\",\"estado\":\"Done\"}]");
    });
  });
});


