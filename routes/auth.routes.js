const { Router } = require('express');
const { check } = require('express-validator');

const { login, signUp, verifyToken } = require('../controllers/auth.controller');
const { validateFields } = require('../middlewares/validate-fields');
const validateJWT = require('../middlewares/validar-jwt');
const router = Router();

router.post('/login', [
    check('email', 'Favor indicar su correo').isEmail(),    
    check('password', 'Favor indicar su contraseña').notEmpty(),
    validateFields
], login);

router.post('/singin', [    
    check('name', 'Nombr debe tener al menos 2 caracteres').isLength({min: 2}),
    check('email', 'Favor proporcionar un correo válido').isEmail(),
    check('password', 'Contraseña debe tener al menos 6 caracteres').isLength({min: 6}),
    validateFields
], signUp);

router.get('/verify-token', [validateJWT], verifyToken)

module.exports = router;


