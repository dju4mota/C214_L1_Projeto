const mongoose = require("mongoose")

const Usuario = mongoose.model('Usuario', {
    nome: String, 
    login: String, 
    senha: String,
    listas: Array
})

module.exports = Usuario