
const express = require('express');
const database = require('./database');
//const cors = require('cors');
const server = express();
//server.use(cors());
server.use(express.json());


server.get('/', async function(request, response) {
    const dados = await database.select();
    return response.json(dados);
})


server.post('/', async function(request, response) {

    const nomedog = request.body.nomedog;
    const peso = request.body.peso;
    const valor = request.body.valor;
    const status= request.body.status;

    const result = await database.insert(nomedog, peso, valor, status);

    return response.status(204).send();
})

server.put('/', async function(request, response) {

    const nomedog = request.body.nomedog; 
    const peso = request.body.peso;
    const valor = request.body.valor;
    const status= request.body.status;

    const result = await database.update(nomedog, peso, valor, status);

    return response.status(204).send();
})

server.delete('/', async function(request, response) {

    const nomedog = request.body.nomedog;
    const result = await database.delete(nomedog);

    return response.status(204).send();
})

server.listen(process.env.PORT || 3000);