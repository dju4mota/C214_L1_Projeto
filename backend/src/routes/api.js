const express = require ('express');
const router = express.Router();

const rotasUsuario = require('./usuario.routes');
const rotasCard = require('./cards.routes')

router.post('/usuario', rotasUsuario.criarUsuario);

router.post('/card', rotasCard.criarCard);

module.exports = router;