const { response, request, json } = require("express");
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
            mensaje: 'Error de servidor, comuniquese con el administrador'
        })
    }
}

const signUp = async(req, res) => {
    const {name, email, password} = req.body;
    // Verificar si email existe
    const existEmail = await User.findOne({ email });

    if(existEmail){
        res.status(406).json({
           'mensaje':'Correo ya se encuentra registrado'
        });
    }

    const user = new User({name, email, password});
    
    user.password = encryptPassword(password);
    const newUser = await user.save();
    const token = await generarJWT(newUser.id);
    
    res.status(201).json({
        token, newUser
    });
}

const verifyToken = async(req = request, res = response) => {
    res.status(200).json({
        ok: true
    })
}

const encryptPassword = (passwd) => {
    const salt = bcrypt.genSaltSync(11);
    return bcrypt.hashSync(passwd, salt)
}

module.exports = { login, signUp, verifyToken }