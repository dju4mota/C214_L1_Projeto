const Card = require('../models/card.model');

exports.criarCard = function (req, res, next) {
    const novoCard = req.body

    if (novoCard.nome == undefined || novoCard.usuario == undefined) {
        return res.status(400).json({ error: "Informe o nome do Card e a qual usuário ele pertence!" })
    }

    novoCard.estado = novoCard.estado == undefined || novoCard.estado == "" ? novoCard.estado = "To Do" : novoCard.estado

    Card.create(novoCard).then(function () {
        return res.send(201);
    }).catch((err) => {
        console.log("Ocorreu um erro na criação do card", err)
        return res.status(500).json({ error: "Erro interno de servidor" })
    });
}