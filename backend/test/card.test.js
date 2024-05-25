jest.mock('../src/models/card.model');
const Card = require('../src/models/card.model');
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
      body: newCard
    });


    it('should create a card', async () => {
      
      Card.create.mockResolvedValue(newCard);
      
      const res = httpMocks.createResponse();
    
      await rotasCard.criarCard(req, res);
    
      expect(res.statusCode).toBe(201);
      expect(res._getData()).toEqual(newCard);
    });

    it('should create two cards', async () => {
          
      Card.create.mockResolvedValue(newCard);
    
      const res = httpMocks.createResponse();
    
      await rotasCard.criarCard(req, res);
    
      expect(res.statusCode).toBe(201);
      expect(res._getData()).toEqual(newCard);
      await rotasCard.criarCard(req, res);
    
      expect(res.statusCode).toBe(201);
      expect(res._getData()).toEqual(newCard);
    });

    it('should not create invalid card (nome undefined)', async () => {
      const cardInvalido = {
        nome: 'Test Card',
        estado: 'Done',
      };
      
      Card.create.mockResolvedValue(cardInvalido);
    
      req.body = cardInvalido
    
      const res = httpMocks.createResponse();
    
      await rotasCard.criarCard(req, res);
    
      expect(res.statusCode).toBe(400);
    });
    it('should not create invalid card (usuario undefined)', async () => {
      const cardInvalido = {
        usuario: 'usuario teste',
        estado: 'Done',
      };
    
      Card.create.mockResolvedValue(cardInvalido);
    
      req.body = cardInvalido
    
      const res = httpMocks.createResponse();
    
      await rotasCard.criarCard(req, res);
    
      expect(res.statusCode).toBe(400);
    });
  });

  describe('GET /card', () => {
    const req = httpMocks.createRequest({
      method: 'GET',
      url: '/card/listar',
    });

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
    
      const res = httpMocks.createResponse();
    
      await rotasCard.listarCards(req, res);
    
      expect(res.statusCode).toBe(200);
      expect(res._getData()).toEqual("[{\"nome\":\"Test Card\",\"usuario\":\"Test User\",\"estado\":\"Done\"},{\"nome\":\"Test Card 2\",\"usuario\":\"Test User 2\",\"estado\":\"Done\"}]");
    });
    it('should return a 500 status when an error occurs', async () => {
      Card.find.mockRejectedValue(new Error('Test error'));
  
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
    });

    it('should edit a card', async () => {
      
      Card.findByIdAndUpdate.mockResolvedValue(updatedCard);
  
      const res = httpMocks.createResponse();
  
      await rotasCard.editarCard(req, res);
  
      expect(res.statusCode).toBe(200);
      

      expect(JSON.parse(res._getData())).toEqual(updatedCard);
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
      url: '/card',
      body: deletedCard,
    });
    
    it('should delete a card', async () => {
  
      Card.findByIdAndRemove.mockResolvedValue(deletedCard);
    
      const res = httpMocks.createResponse();
  
      await rotasCard.excluirCard(req, res);
  
      expect(res.statusCode).toBe(200);
      expect(res._getData()).toEqual(deletedCard);
    });
  });
});


