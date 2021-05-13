const User = require('../models/usuario.model');

const verifyEmail = async(email= '') => {
    // check if mail exists
    const existEmail = await User.findOne({ email });
    if (existEmail) {
        throw new Error(`Correo ya se encuentra registrado.`);
    }
}

const verifyIfMongoIdExist = async(id) => {
    // check if mail exists
    const existMongoId = await User.findById(id);
    if (!existMongoId) {
        throw new Error(`No existe usuario con Id indicado.`);
    }
}

module.exports = { verifyEmail, verifyIfMongoIdExist };









