const { response, request } = require('express');

const jwt = require('jsonwebtoken');

const validateJWT = (req = request, res = response, next) => {
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            mensaje: 'Usuario no autorizado'
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETKEY);
        next();
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Error de aplicación, cominiquese con el administrador'
        });        
    }   
}

module.exports = validateJWT;