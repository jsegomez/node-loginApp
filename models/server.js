const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config.db');

class Server{
    constructor(){
        this.app  = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';
        this.authPath = '/api/auth';

        // Database
        this.dbConnection();

        // Middlewares
        this.middlewares();

        // Rutas de aplicación
        this.routes();
    }

    async dbConnection(){
        await dbConnection();
    }


    middlewares(){
        // CORS
        this.app.use(cors());

        // Lectura y parseo de body
        this.app.use(express.json());
    }

    routes(){
        this.app.use(this.authPath, require('../routes/auth.routes'));
        this.app.use(this.usersPath, require('../routes/user.routes'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo el puerto ${this.port}`)
        });
    }
}

module.exports = Server;

