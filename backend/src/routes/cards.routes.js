const Card = require('../models/card.model');

exports.criarCard = async function (req, res, next) {
    const novoCard = req.body;

    try {
        //console.log(req.body)
        //console.log(req.body)

        if (novoCard.nome === undefined || novoCard.usuario === undefined) {
            return res.status(400).json({ error: "Informe o nome do Card e a qual usuário ele pertence!" });
        }

        novoCard.estado = novoCard.estado === undefined || novoCard.estado === "" ? novoCard.estado = "To Do" : novoCard.estado;

        const card = await Card.create(novoCard);
        console.log("Card criado com sucesso", card);
        return res.status(201).send(card);
    } catch (err) {
        console.log("Ocorreu um erro na criação do card", err);
        return res.status(500).json({ error: "Erro interno de servidor" });
    }
};

exports.listarCards = async function(req, res, next) {
    try {
        const cards = await Card.find({});
        return res.status(200).json(cards);
    } catch (err) {
        console.log("Ocorreu um erro ao buscar os cards", err);
        return res.status(500).json({ error: "Erro interno de servidor" });
    }
};

exports.editarCard = async function(req, res, next) {
    const { id } = req.params;
    const novoCard = req.body;

    try {
        const card = await Card.findByIdAndUpdate(id, novoCard, { new: true });
        if (!card) {
            return res.status(404).json({ error: "Card não encontrado" });
        }
        return res.status(200).json(card);
    } catch (err) {
        console.log("Ocorreu um erro ao editar o card", err);
        return res.status(500).json({ error: "Erro interno de servidor" });
    }
};

exports.excluirCard = async function(req, res, next) {
    const { id } = req.params;

    try {
        const card = await Card.findByIdAndDelete(id);
        if (!card) {
            return res.status(404).json({ error: "Card não encontrado" });
        }
        return res.status(200).json({ message: "Card excluído com sucesso" });
    } catch (err) {
        console.log("Ocorreu um erro ao excluir o card", err);
        return res.status(500).json({ error: "Erro interno de servidor" });
    }
};
