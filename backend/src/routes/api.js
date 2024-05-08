const express = require ('express');
const router = express.Router();

const rotasUsuario = require('./usuario.routes');
const rotasLista = require('./lista.routes')
const rotasCard = require('./cards.routes')

router.post('/usuario', rotasUsuario.criarUsuario);

router.put('/usuario/criarLista', rotasLista.criarLista);

router.post('/card', rotasCard.criarCard);

module.exports = router;