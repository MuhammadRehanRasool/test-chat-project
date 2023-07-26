const http = require('http');
const Sequelize = require('sequelize');

const hostname = '127.0.0.1';
const port = 5000;

const express = require('express');
const app = express();

const server = http.createServer(app);

app.get('/', (req, res) => {
    res.send('Hello from Express!');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});