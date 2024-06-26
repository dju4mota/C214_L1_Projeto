const Usuario = require('../models/usuario.model');

exports.criarCard = async function (req, res, next) {

    if(!req.body.usuario || !req.query.nomeLista || !req.body.nome) {
        return res.status(400).json({ error: "Informe o id do usuário, o nome da lista e o nome do card que deseja criar" })
    }
    
    const novoCard = req.body;
    novoCard.estado = !novoCard.estado ? novoCard.estado = "To Do" : novoCard.estado;

    try {
        const usuario = await Usuario.findById(req.body.usuario)
        if (!usuario) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        const listasAtualizadas = usuario.listas.map((listaAtual) => {
            if(listaAtual.nome === req.query.nomeLista) {
                listaAtual.cards.push(novoCard);
            }
            return listaAtual;
        })
        
        const usuarioAtualizado = await Usuario.findByIdAndUpdate(usuario.id, {
            listas: listasAtualizadas
        }, {
            new: true
        })

        return res.status(201).send(usuarioAtualizado.listas);
    } catch (err) {
        console.log("Ocorreu um erro na criação do card", err);
        return res.status(500).json({ error: "Erro interno de servidor" });
    }
};

exports.listarCards = async function(req, res, next) {

    if(!req.params.idUsuario || !req.query.nomeLista) {
        return res.status(400).json({ error: "Informe o id do usuário e o nome da lista que deseja ver os cards" })
    }

    try {
        const usuario = await Usuario.findById(req.params.idUsuario)
        if (!usuario) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }
        const lista = usuario.listas.find((element) => element.nome == req.query.nomeLista);
        if (!lista) {
            return res.status(404).json({ error: "Lista não encontrada" });
        }
        return res.json(lista.cards)
    } catch (err) {
        console.log("Ocorreu um erro ao buscar os cards", err);
        return res.status(500).json({ error: "Erro interno de servidor" });
    }
};

exports.editarCard = async function(req, res, next) {

    if(!req.body.usuario || !req.query.nomeLista || !req.body.nome) {
        return res.status(400).json({ error: "Informe o id do usuário, o nome da lista e o nome do card que deseja atualizar" })
    }
    
    const cardAtualizado = req.body;

    try {
        const usuario = await Usuario.findById(req.body.usuario)
        if (!usuario) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        const listasAtualizadas = usuario.listas.map((listaAtual) => {
            if(listaAtual.nome === req.query.nomeLista) {
                listaAtual.cards = listaAtual.cards.map((cardAtual) => {
                    if(cardAtual.nome === req.body.nome) {
                        cardAtual = cardAtualizado;
                    }
                    return cardAtual;
                })
            return listaAtual;
        }})
        
        const usuarioAtualizado = await Usuario.findByIdAndUpdate(usuario.id, {
            listas: listasAtualizadas
        }, {
            new: true
        })

        return res.status(200).send(usuarioAtualizado.listas);
    } catch (err) {
        console.log("Ocorreu um erro na atualização do card", err);
        return res.status(500).json({ error: "Erro interno de servidor" });
    }
};

exports.excluirCard = async function(req, res, next) {

    if(!req.body.usuario || !req.query.nomeLista || !req.body.nome) {
        return res.status(400).json({ error: "Informe o id do usuário, o nome da lista e o nome do card que deseja excluir" })
    }

    try {
        const usuario = await Usuario.findById(req.body.usuario)
        if (!usuario) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        const listasAtualizadas = usuario.listas.filter((listaAtual) => {
            if(listaAtual.nome == req.query.nomeLista){
                listaAtual.cards = listaAtual.cards.filter((card) => {
                    return card.nome !== req.body.nome;
                });
            }

            return listaAtual;
        });

        await Usuario.findByIdAndUpdate(req.body.usuario, {
            listas: listasAtualizadas
        })

        return res.status(200).json({ message: "Card excluído com sucesso" });
    } catch (err) {
        console.log("Ocorreu um erro na remoção do card", err);
        return res.status(500).json({ error: "Erro interno de servidor" });
    }
};
