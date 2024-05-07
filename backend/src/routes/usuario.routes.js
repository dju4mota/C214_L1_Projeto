const Usuario = require('../models/usuario.model');

exports.criarUsuario = function (req, res, next) {
    const { nome, login, senha } = req.body
    req.body.listas = []

    if (nome == undefined || login == undefined || senha == undefined) {
        return res.status(400).json({ error: "Informe todos os dados necessários!" })
    }

    Usuario.create(req.body).then(function () {
        return res.send(201);
    }).catch((err) => {
        console.log("Ocorreu um erro na criação de usuário", err)
        return res.status(500).json({ error: "Erro interno de servidor" })
    });
}
