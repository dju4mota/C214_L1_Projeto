const express = require('express');
const router = express.Router();

const rotasUsuario = require('./usuario.routes');
const rotasLista = require('./lista.routes');
const rotasCard = require('./cards.routes');

router.post('/usuario', rotasUsuario.criarUsuario);
router.get('/usuario/buscarTodos', rotasUsuario.buscarTodos);
router.get('/usuario/:idUsuario', rotasUsuario.buscarUsuario);
router.put('/usuario/:idUsuario', rotasUsuario.editarUsuario); 
router.delete('/usuario/:idUsuario', rotasUsuario.excluirUsuario); 

router.post('/usuario/lista/criarLista', rotasLista.criarLista);
router.get('/usuario/lista/:idUsuario', rotasLista.buscarListas);
router.put('/usuario/lista/atualizarLista', rotasLista.atualizarLista);
router.delete('/usuario/lista/excluirLista', rotasLista.excluirLista);

router.post('/card', rotasCard.criarCard);
router.get('/card/listar/:idUsuario', rotasCard.listarCards); 
router.put('/card', rotasCard.editarCard);
router.delete('/card/', rotasCard.excluirCard); 

module.exports = router;
