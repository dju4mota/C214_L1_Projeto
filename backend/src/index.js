require('dotenv').config() // Importando as configurações do arquivo .env que tem que estar criado dentro da pasta backend
const port = process.env.port || 3000 // No arquivo .env você pode selecionar a porta que quiser, se não criar o arquivo a porta será 3000

const express = require("express")
const mongoose = require("mongoose") // ORM usado para realizar as operações de CRUD mais fácil

const app = express()
app.use(express.json())

app.get("/health", (req,res)=>{
    return res.send("App rodando")
})

app.listen(port, ()=>{
    console.log("A connection url definida foi:", process.env.connection_url)
    console.log("A porta definida foi:", port)
    mongoose.connect(process.env.connection_url)
    console.log("App rodando")
})