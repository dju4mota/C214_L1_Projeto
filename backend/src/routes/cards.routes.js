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

exports.listarCards = function(req, res, next) {
    Card.find({})
        .then(function(cards) {
            return res.status(200).json(cards);
        })
        .catch(function(err) {
            console.log("Ocorreu um erro ao buscar os cards", err);
            return res.status(500).json({ error: "Erro interno de servidor" });
        });
};

exports.editarCard = function(req, res, next) {
    const { id } = req.params;
    const novoCard = req.body;

    Card.findByIdAndUpdate(id, novoCard, { new: true })
        .then(function(card) {
            if (!card) {
                return res.status(404).json({ error: "Card não encontrado" });
            }
            return res.status(200).json(card);
        })
        .catch(function(err) {
            console.log("Ocorreu um erro ao editar o card", err);
            return res.status(500).json({ error: "Erro interno de servidor" });
        });
};

exports.excluirCard = function(req, res, next) {
    const { id } = req.params;

    Card.findByIdAndDelete(id)
        .then(function(card) {
            if (!card) {
                return res.status(404).json({ error: "Card não encontrado" });
            }
            return res.status(200).json({ message: "Card excluído com sucesso" });
        })
        .catch(function(err) {
            console.log("Ocorreu um erro ao excluir o card", err);
            return res.status(500).json({ error: "Erro interno de servidor" });
        });
};