const mongoose = require("mongoose")

const Item = mongoose.model('Item', {
    nome: String,
    status: String
})

module.exports = Item