const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGODB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('Conectado a base de datos')
    } catch (error) {
        throw new Error('Error al conectarse a base de datos');
    }
}

module.exports = { dbConnection };



