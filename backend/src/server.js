require('dotenv').config() // Importando as configurações do arquivo .env que tem que estar criado dentro da pasta backend
const port = process.env.port || 3000 // No arquivo .env você pode selecionar a porta que quiser, se não criar o arquivo a porta será 3000
const mongoose = require("mongoose") // ORM usado para realizar as operações de CRUD mais fácil

const app = require('./index.js')

app.listen(port, () => {
    console.log("A connection url definida foi:", process.env.connection_url)
    console.log("A porta definida foi:", port)
    mongoose.connect(process.env.connection_url)
    console.log("App rodando")
})