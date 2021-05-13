const { response } = require("express");
const User = require('../models/usuario.model');
const bcrypt = require('bcrypt');
const { generarJWT } = require("../helpers/generate-jwt");

const login = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                mensaje: 'Usuario y/o contraseña invalido'
            });
        }

        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(404).json({
                mensaje: 'Usuario y/o contraseña invalido'
            });
        }

        // Generar token
        const token = await generarJWT(user.id);

        res.status(200).json({
            user, token
        })
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Error de servidor, comuniquse con el administrador'
        })
    }
}

module.exports = { login }