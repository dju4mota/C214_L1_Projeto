const Usuario = require('../models/usuario.model');

exports.criarLista = async function (req, res, next) {
    const novaLista = req.body
    let usuario, usuarioAtualizado

    if (novaLista.nome == undefined || novaLista.idUsuario == undefined) {
        return res.status(400).json({ error: "Informe o nome da lista e a qual usuário ela pertence!" })
    }

    try {
        usuario = await Usuario.findById(novaLista.idUsuario)
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
    } catch (err) {
        console.log("Ocorreu um erro no update do Usuário", err)
        return res.status(500).json({ error: "Erro interno de servidor" })
    }

    return res.json(usuarioAtualizado.listas)
}