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

exports.listarUsuario = function (req, res, next) {
    Usuario.find({}, function (err, usuarios) {
        if (err) {
            console.log("Ocorreu um erro ao buscar os usuários", err);
            return res.status(500).json({ error: "Erro interno de servidor" });
        }
        return res.status(200).json(usuarios);
    });
}

exports.editarUsuario = function (req, res, next) {
    const { id } = req.params;
    const { nome, login, senha } = req.body;

    if (nome === undefined || login === undefined || senha === undefined) {
        return res.status(400).json({ error: "Informe todos os dados necessários!" });
    }

    Usuario.findByIdAndUpdate(id, req.body, { new: true }, function (err, usuario) {
        if (err) {
            console.log("Ocorreu um erro ao editar o usuário", err);
            return res.status(500).json({ error: "Erro interno de servidor" });
        }
        return res.status(200).json(usuario);
    });
}

exports.excluirUsuario = function (req, res, next) {
    const { id } = req.params;

    Usuario.findByIdAndDelete(id, function (err, usuario) {
        if (err) {
            console.log("Ocorreu um erro ao excluir o usuário", err);
            return res.status(500).json({ error: "Erro interno de servidor" });
        }
        if (!usuario) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }
        return res.status(200).json({ message: "Usuário excluído com sucesso" });
    });
}

