// Importaciones propias
const Server = require('./models/server');

// Variables de entorno
require('dotenv').config();

// Configuración de servidor express
const server = new Server();

server.listen();



