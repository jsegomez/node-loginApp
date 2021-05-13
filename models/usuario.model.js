const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        require: [true, 'Favor indicar nombre']
    },
    avatar:{
        type: String,        
        default: 'av-1.png'
    },
    email:{
        type: String,
        unique: true,
        require: [true, 'Favor indicar un correo electrónico']
    },
    password:{
        type: String,        
        require: [true, 'Favor proporcionar una contraseña']
    }
});

UserSchema.methods.toJSON = function () {
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id    
    return user;
}

module.exports = model('User', UserSchema);



