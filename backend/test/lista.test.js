jest.mock('../src/models/usuario.model');
const Usuario = require('../src/models/usuario.model');
const rotasLista = require('../src/routes/lista.routes.js');
const httpMocks = require('node-mocks-http'); // biblioteca para mock de objetos req e res



describe('Usuario Routes', () => {
  

  describe('POST /usuario/lista/criarLista', () => {
    let user
  let newLista
    beforeEach(() => {
        jest.resetAllMocks(); // Ou jest.clearAllMocks();
        res = httpMocks.createResponse();
        user = {
            nome: 'dju4mota',
            login: 'dju4mota',
            senha: 'senha123',
            id: "123",
            listas: []
          };
    
        const card1 = {
            nome: 'Test Card',
            usuario: 'Test User',
            estado: 'Done',
        };
        const card2 = {
            nome: 'Test Card',
            usuario: 'Test User',
            estado: 'Done',
        };
    
        newLista = {
            nome: 'lista 3',
            idUsuario: "123",
            cards: [card1, card2],
        };
        req = httpMocks.createRequest({
            method: 'POST',
            url: '/usuario/lista/criarLista',
            body: newLista
          });
      });

    afterEach(() => {
        jest.clearAllMocks();
      });



    it('should create a list', async () => {
      
        Usuario.findById.mockResolvedValue(user);
        Usuario.findByIdAndUpdate.mockResolvedValue(newLista);        
    
        await rotasLista.criarLista(req, res);
        expect(res.statusCode).toBe(201);
        //expect(res._getData()).toEqual(newLista);
    });

    it('should not create invalid list (user undefined)', async () => {

        req.body = {
            nome: 'lista 3',
            cards: [],
        }
        await rotasLista.criarLista(req, res);
        expect(res.statusCode).toBe(400);        
    });

    
    it('should not create invalid list (nome undefined)', async () => {
        req.body = {
            idUsuario: '123',
            cards: [],
        }
        await rotasLista.criarLista(req, res);
        expect(res.statusCode).toBe(400);        
    });

    it('should not create invalid list', async () => {

        Usuario.findById.mockResolvedValue();
    
        await rotasLista.criarLista(req, res);
        expect(res.statusCode).toBe(404);
        
    });

    it('should return a 500 status when an error occurs', async () => {
        Usuario.findById.mockResolvedValue(user);
        Usuario.findByIdAndUpdate.mockRejectedValue(new Error('Test error'));
  
        req.body = newLista
  
        await rotasLista.criarLista(req, res);
  
        expect(res.statusCode).toBe(500);
        expect(res._getData()).toEqual( "{\"error\":\"Erro interno de servidor\"}");
    });

    it('should return a 500 status when an error occurs', async () => {
        
        Usuario.findById.mockRejectedValue(new Error('Test error'));
  
        req.body = newLista
  
        await rotasLista.criarLista(req, res);
  
        expect(res.statusCode).toBe(500);
        expect(res._getData()).toEqual( "{\"error\":\"Erro interno de servidor\"}");
    });

  });
  
  describe('GET /usuario/lista/:idusuario', () => {
    let user
    let newLista
    beforeEach(() => {
        jest.resetAllMocks(); // Ou jest.clearAllMocks();
        res = httpMocks.createResponse();
    
    
        const card1 = {
            nome: 'Test Card',
            usuario: 'Test User',
            estado: 'Done',
        };
        const card2 = {
            nome: 'Test Card',
            usuario: 'Test User',
            estado: 'Done',
        };
    
        newLista = {
            nome: 'lista 3',
            idUsuario: "123",
            cards: [card1, card2],
        };
        user = {
            nome: 'dju4mota',
            login: 'dju4mota',
            senha: 'senha123',
            id: "123",
            listas: newLista
          };

        req = httpMocks.createRequest({
            method: 'GET',
            url: '/usuario/lista',
            params: {
              idUsuario: '123'
            }
          });
      });

    afterEach(() => {
        jest.clearAllMocks();
      });


    it('should list all users', async () => {
      
      Usuario.findById.mockResolvedValue(user);  
    
      await rotasLista.buscarListas(req, res);
    
      //expect(res.statusCode).toBe(200);
      expect(res._getData()).toEqual("{\"nome\":\"lista 3\",\"idUsuario\":\"123\",\"cards\":[{\"nome\":\"Test Card\",\"usuario\":\"Test User\",\"estado\":\"Done\"},{\"nome\":\"Test Card\",\"usuario\":\"Test User\",\"estado\":\"Done\"}]}");
    });

    it('should not get invalid list (user undefined)', async () => {

        req.params = {}
        await rotasLista.buscarListas(req, res);
        expect(res.statusCode).toBe(400);        
    });
 
    
    it('should not get invalid list (user not found)', async () => {

        Usuario.findById.mockResolvedValue()

        await rotasLista.buscarListas(req, res);
        expect(res.statusCode).toBe(404);        
    });

    it('should return a 500 status when an error occurs', async () => {
      Usuario.findById.mockRejectedValue(new Error('Test error'));
  
      await rotasLista.buscarListas(req, res);
  
      expect(res.statusCode).toBe(500);
      expect(res._getData()).toEqual( "{\"error\":\"Erro interno de servidor\"}");
    });

  });
  
  describe('UPDATE /atualizarLista', () => {
    let listUpdated
    let user
    let newLista

    beforeEach(() => {
        jest.resetAllMocks(); // Ou jest.clearAllMocks();
        res = httpMocks.createResponse();
        
        
        const card1 = {
            nome: 'Test Card',
            usuario: 'Test User',
            estado: 'Done',
        };
        const card2 = {
            nome: 'Test Card',
            usuario: 'Test User',
            estado: 'Done',
        };
        listUpdated = {
            nome: 'lista 3',
            idUsuario: "123",
            cards: [card1],
        }
        newLista = {
            nomeLista: 'lista 3',
            idUsuario: "123",
            cards: [card1, card2],
            listaAtualizada: listUpdated
        };
        user = {
            nome: 'dju4mota',
            login: 'dju4mota',
            senha: 'senha123',
            id: "123",
            listas: [newLista]
          };
        
        req = httpMocks.createRequest({
            method: 'PUT',
            url: '/usuario/lista/atualizarLista',
            body: newLista
          });
      });

    afterEach(() => {
        jest.clearAllMocks();
    });

    
    it('should edit a user', async () => {
      
        Usuario.findById.mockResolvedValue(user);
        user.listas = [listUpdated]
        Usuario.findByIdAndUpdate.mockResolvedValue(user);
    
        await rotasLista.atualizarLista(req, res);
    
        expect(res.statusCode).toBe(200);      
        expect(JSON.parse(res._getData())).toEqual([listUpdated]);
  
      });

    it('should not get invalid list (user undefined)', async () => {

        req.body = {
            nome: 'lista 3',
            cards: [],
        }
        await rotasLista.atualizarLista(req, res);
        expect(res.statusCode).toBe(400);        
    });

    it('should not get invalid list (nome undefined)', async () => {

        req.body = {
            idUsuario: "123",
            cards: [],
        }
        await rotasLista.atualizarLista(req, res);
        expect(res.statusCode).toBe(400);        
    });


    it('should not edit a list, Usuario not found', async () => {
      
      Usuario.findById.mockResolvedValue();
  
      await rotasLista.atualizarLista(req, res);
  
      expect(res.statusCode).toBe(404);      
      expect(res._getData()).toEqual( "{\"error\":\"Usuário não encontrado\"}");  

    });

    it('should return a 500 status when an error occurs', async () => {
      Usuario.findById.mockRejectedValue(new Error('Test error'));


      await rotasLista.atualizarLista(req, res);
      expect(res.statusCode).toBe(500);
      expect(res._getData()).toEqual( "{\"error\":\"Erro interno de servidor\"}");
    });
  });

  describe('DELETE /lista', () => {
    
    let user
    let newLista
    beforeEach(() => {
        jest.resetAllMocks(); // Ou jest.clearAllMocks();
        res = httpMocks.createResponse();
    
        const card1 = {
            nome: 'Test Card',
            usuario: 'Test User',
            estado: 'Done',
        };
        const card2 = {
            nome: 'Test Card',
            usuario: 'Test User',
            estado: 'Done',
        };
    
        newLista = {
            nomeLista: 'lista 3',
            idUsuario: "123",
            cards: [card1, card2],
        };
        user = {
            nome: 'dju4mota',
            login: 'dju4mota',
            senha: 'senha123',
            id: "123",
            listas: newLista
          };

        req = httpMocks.createRequest({
            method: 'GET',
            url: '/usuario/lista/listas',
            body: newLista
          });
      });

    afterEach(() => {
        jest.clearAllMocks();
      });
    
    it('should delete a list', async () => {

      Usuario.findById.mockResolvedValue(user);
      user.listas = []
      Usuario.findByIdAndUpdate.mockResolvedValue(user);
  

      await rotasLista.excluirLista(req, res);

      expect(res.statusCode).toBe(200);
      expect(res._getData()).toEqual("[]");
    });

    it('should not delete a list, user not found', async () => {
      
      Usuario.findByIdAndUpdate.mockResolvedValue();


      await rotasLista.excluirLista(req, res);

      expect(res.statusCode).toBe(404);      
      expect(res._getData()).toEqual( "{\"error\":\"Usuário não encontrado\"}");  

    });

    it('should not get invalid list (user undefined)', async () => {

        req.body = {
            nome: 'lista 3',
            cards: [],
        }
        await rotasLista.excluirLista(req, res);
        expect(res.statusCode).toBe(400);        
    });

    it('should not get invalid list (nome undefined)', async () => {

        req.body = {
            idUsuario: "123",
            cards: [],
        }
        await rotasLista.excluirLista(req, res);
        expect(res.statusCode).toBe(400);        
    });

    it('should return a 500 status when an error occurs', async () => {
      
        Usuario.findById.mockResolvedValue(user)
        Usuario.findByIdAndUpdate.mockRejectedValue(new Error('Test error'));

        await rotasLista.excluirLista(req, res);
        expect(res.statusCode).toBe(500);
        expect(res._getData()).toEqual( "{\"error\":\"Erro interno de servidor\"}");
    });

  });

});