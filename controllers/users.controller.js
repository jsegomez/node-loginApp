const { response } = require('express');
const bcrypt = require('bcrypt');

// Model
const User = require('../models/usuario.model');

const getListUsers = async(req, res = response) => {
    const { limit } = req.query;
    const users = await User.find().limit(Number(limit) || 10 );

    res.status(200).json({
        users        
    });
}

const getUserById = async(req, res = response) => {
    const { id } = req.params;    
    const user = await User.findById(id)

    res.status(200).json({
        user, uid
    })
}

const updateUser = async(req, res) => {
    const { id } = req.params;
    const { password, ... user} = req.body;

    if(password) user.password = encryptPassword(password);

    const userUpdated = await User.findByIdAndUpdate(id, user);

    res.status(201).json({
        userUpdated  
    });
}

const deleteById = async(req, res = response) => {
    const { id } = req.params;    
    const { uid } = req.uid;
    const userDeleted = await User.findByIdAndDelete(id);

    res.status(204).json({
        mensaje: 'Usuario eliminado de la base de datos',
        uid
    })
}

const encryptPassword = (passwd) => {
    const salt = bcrypt.genSaltSync(11);
    return bcrypt.hashSync(passwd, salt)
}

module.exports = { getUserById, updateUser, getListUsers, deleteById }



