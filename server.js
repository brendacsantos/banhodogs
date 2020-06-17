const express = require('express');
const database = require('./database');
const cors = require('cors');

const server = express();
// o cors permite que o servidor aceite requisições de qualquer lugar
server.use(cors());
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

server.put('/:id', async function(request, response) {

    const id = request.body.id;
    const nomedog = request.body.nomedog; 
    const peso = request.body.peso;
    const valor = request.body.valor;
    const status= request.body.status;

    const result = await database.update(nomedog, peso, valor, status);

    return response.status(204).send();
})

server.delete('/:id', async function(request, response) {
    
    const id = request.params.id;
    const result = await database.delete(id);
   return response.status(204).send()
})

server.listen(process.env.PORT || 3000);
