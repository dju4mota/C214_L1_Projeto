const mongoose = require("mongoose")

const List = mongoose.model('List', {
    nome: String,
    cards: Object
})

module.exports = List