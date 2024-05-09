const Usuario = require('../models/usuario.model');

exports.criarUsuario = async function (req, res, next) {
    const { nome, login, senha } = req.body
    req.body.listas = []

    if (!nome || !login || !senha) {
        return res.status(400).json({ error: "Informe todos os dados necessários!" })
    }

    try {
        const usuario = await Usuario.create(req.body)
        return res.status(201).json({ id: usuario.id });
        
    } catch (error) {
        console.log("Ocorreu um erro na criação de usuário", error)
        return res.status(500).json({ error: "Erro interno de servidor" })
    }
}

exports.buscarUsuario = async function (req, res, next) {    
    try {
        const usuario = await Usuario.findById(req.params.idUsuario)
        if (!usuario) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }
        const usuarioSemSenha = {
            id: usuario.id,
            nome: usuario.nome, 
            login: usuario.login, 
            listas: usuario.listas
        }
        return res.status(200).json(usuarioSemSenha);
    } catch (error) {
        console.log("Ocorreu um erro ao buscar o usuário", error);
        return res.status(500).json({ error: "Erro interno de servidor" });
    }
}

exports.buscarTodos = async function (req, res, next) {
    try {
        const usuarios = await Usuario.find({})
        const usuariosSemSenha = usuarios.map((user) => {
            const newUser = {
                id: user.id,
                nome: user.nome, 
                login: user.login, 
                listas: user.listas
            }
            return newUser
        })
        return res.status(200).json(usuariosSemSenha);
    } catch (error) {
        console.log("Ocorreu um erro ao buscar todos os usuários", error);
        return res.status(500).json({ error: "Erro interno de servidor" });
    }
}


exports.editarUsuario = async function (req, res, next) {
    const { idUsuario } = req.params;
    const { senha } = req.body;

    try {
        // Recupera o usuário atual do banco de dados usando o ID fornecido
        const usuarioAtual = await Usuario.findById(idUsuario);

        // Verifica se o usuário existe
        if (!usuarioAtual) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        // Verifica se a senha fornecida corresponde à senha do usuário atual
        if (senha !== usuarioAtual.senha) {
            return res.status(400).json({ error: "Senha incorreta" });
        }

        // Atualiza os campos do usuário
        const usuario = await Usuario.findByIdAndUpdate(idUsuario, req.body.usuarioModificado, { new: true });
        
        const newUser = {
            nome: usuario.nome, 
            login: usuario.login, 
            listas: usuario.listas
        }
        
        return res.status(200).json(newUser);
    } catch (error) {
        console.log("Ocorreu um erro ao editar o usuário", error);
        return res.status(500).json({ error: "Erro interno de servidor" });
    }
}


exports.excluirUsuario = async function (req, res, next) {
    const { idUsuario } = req.params;

    try {
        const usuario = await Usuario.findByIdAndDelete(idUsuario);
        if (!usuario) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }
        return res.status(200).json({ message: "Usuário excluído com sucesso" });
    } catch (error) {
        console.log("Ocorreu um erro ao excluir o usuário", error);
        return res.status(500).json({ error: "Erro interno de servidor" });
    }
}


