const express = require('express');
const mongoose = require('mongoose')
const routes = require('./routes')
const cors = require('cors')
const http = require('http')
const { config_socker } =require('./websocket')
const app = express();
const server = http.Server(app)

config_socker(server)

mongoose.connect('mongodb+srv://omni:omni@estudos-297yv.mongodb.net/radarDev?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
app.use(cors())
app.use(express.json())
app.use(routes)


server.listen(3333, () => console.log('Online na porta 3333'))