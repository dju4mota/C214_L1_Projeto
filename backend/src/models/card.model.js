const mongoose = require("mongoose")

const Card = mongoose.model('Card', {
    estado: String, 
    nome: String, 
    descrição: String, 
    data: Date,
    usuario: Object, 
    checklist: Array,
})

module.exports = Card