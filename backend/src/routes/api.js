const express = require ('express');
const router = express.Router();

const rotasUsuario = require('./usuario.routes');

router.post('/usuario', rotasUsuario.criarUsuario);

module.exports = router;