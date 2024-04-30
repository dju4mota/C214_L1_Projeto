const Usuario = require('../models/usuario.model');

exports.criarUsuario = function (req, res, next) {
    const { nome, login, senha } = req.body
    req.body.listas = []

    if (nome == undefined || login == undefined || senha == undefined) {
        return res.json({ error: "Informe todos os dados necessários!" }).send(400)
    }

    Usuario.create(req.body).then(function () {
        return res.send(201);
    }).catch((err) => {
        console.log("Ocorreu um erro na criação de usuário", err)
        return res.json({ error: "Erro interno de servidor" }).send(500)
    });
}
