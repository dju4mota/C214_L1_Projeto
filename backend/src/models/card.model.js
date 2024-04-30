const mongoose = require("mongoose")

const Card = mongoose.model('Card', {
    estado: String, 
    nome: String, 
    descricao: String, 
    data: Date,
    usuario: String, 
    checklist: Array,
})

module.exports = Card