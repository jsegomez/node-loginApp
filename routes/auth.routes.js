const { Router } = require('express');
const { check } = require('express-validator');

const { login, signUp } = require('../controllers/auth.controller');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.post('/login', [
    check('email', 'Favor indicar su correo').isEmail(),    
    check('password', 'Favor indicar su contraseña').notEmpty(),
    validateFields
], login);

router.post('/singin', [
    check('fullName', 'Nombr debe tener al menos 2 caracteres').isLength({min: 2}),
    check('email', 'Favor proporcionar un correo válido').isEmail(),
    check('password', 'Contraseña debe tener al menos 6 caracteres').isLength({min: 6}),
    validateFields
], signUp);

module.exports = router;


