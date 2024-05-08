
const express = require("express")
const cors = require('cors');
const routes = require('./routes/api');

const app = express()
app.use(express.json())
app.use(cors())
app.use('', routes);

app.get("/health", (req, res) => {
    return res.send("App rodando")
})

module.exports = app