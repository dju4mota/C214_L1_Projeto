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

router.post('/usuario/criarLista', rotasLista.criarLista);
router.get('/usuario/listas', rotasLista.buscarListas);
router.put('/usuario/atualizarLista', rotasLista.atualizarLista);
router.delete('/usuario/excluirLista', rotasLista.excluirLista);

router.post('/card', rotasCard.criarCard);

module.exports = router;
