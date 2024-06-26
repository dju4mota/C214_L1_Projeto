const Usuario = require('../models/usuario.model');

exports.criarLista = async function (req, res, next) {
    const novaLista = req.body
    let usuario, usuarioAtualizado

    if (!novaLista.nome || !novaLista.idUsuario) {
        return res.status(400).json({ error: "Informe o nome da lista e a qual usuário ela pertence!" })
    }

    try {
        usuario = await Usuario.findById(novaLista.idUsuario)
        if (!usuario) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }
    } catch (err) {
        console.log("Ocorreu um erro na busca do Usuário", err)
        return res.status(500).json({ error: "Erro interno de servidor" })
    }
    
    delete novaLista.idUsuario
    usuario.listas.push(novaLista)

    try {
        usuarioAtualizado = await Usuario.findByIdAndUpdate(usuario.id, {
            listas: usuario.listas
        }, {
            new: true
        })
        return res.status(201).json(usuarioAtualizado.listas)
    } catch (err) {
        console.log("Ocorreu um erro no update do Usuário", err)
        return res.status(500).json({ error: "Erro interno de servidor" })
    }

}

exports.buscarListas = async function (req, res, nxt) {

    if(!req.params.idUsuario) {
        return res.status(400).json({ error: "Informe o id do usuário" })
    }

    try {
        const usuario = await Usuario.findById(req.params.idUsuario)
        if (!usuario) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }
        return res.json(usuario.listas)
    } catch (error) {
        console.log('Erro ao buscar as listas do usuário')
        return res.status(500).json({ error: "Erro interno de servidor" })
    }
}

exports.atualizarLista = async function(req, res, next) {

    if(!req.body.idUsuario || !req.body.nomeLista) {
        return res.status(400).json({ error: "Informe o id do usuário e o nome da lista que deseja atualizar" })
    }

    try {
        const usuario = await Usuario.findById(req.body.idUsuario)
        if (!usuario) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }
        const listasAtualizadas = usuario.listas.map(listaAtual => listaAtual.nome === req.body.nomeLista ? req.body.listaAtualizada : listaAtual);
        const usuarioAtualizado = await Usuario.findByIdAndUpdate(req.body.idUsuario, {
            listas: listasAtualizadas
        }, {
            new: true
        })

        return res.json(usuarioAtualizado.listas)
    } catch (error) {
        console.log('Erro ao atualizar as listas do usuário')
        return res.status(500).json({ error: "Erro interno de servidor" })
    }
}

exports.excluirLista = async function (req, res, nxt) {

    if(!req.body.idUsuario || !req.body.nomeLista) {
        return res.status(400).json({ error: "Informe o id do usuário e o nome da lista que deseja excluir" })
    }

    try {
        const usuario = await Usuario.findById(req.body.idUsuario)
        if (!usuario) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }
        const listasAtualizadas = usuario.listas.filter(listaAtual => listaAtual.nome != req.body.nomeLista);
        const usuarioAtualizado = await Usuario.findByIdAndUpdate(req.body.idUsuario, {
            listas: listasAtualizadas
        }, {
            new: true
        })

        return res.json(usuarioAtualizado.listas)
    } catch (error) {
        console.log('Erro ao excluir a lista do usuário')
        return res.status(500).json({ error: "Erro interno de servidor" })
    }
}