const mongoose = require("mongoose")

const Lista = mongoose.model('Lista', {
    nome: String,
    cards: Object
})

module.exports = Lista