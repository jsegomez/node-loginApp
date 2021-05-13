const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/auth.controller');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.post('/login', [
    check('email', 'Favor indicar su correo').isEmail(),    
    check('password', 'Favor indicar su contraseña').notEmpty(),
    validateFields
], login);

module.exports = router;


